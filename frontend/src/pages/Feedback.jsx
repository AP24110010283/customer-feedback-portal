import React, { useEffect, useState, useContext } from "react";
import { createFeedback, getFeedback, updateFeedback, deleteFeedback } from "../services/feedbackService";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { sampleFeedback } from "../data/sampleData";
import DynamicBackground from "../components/DynamicBackground";

function Feedback() {
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", category: "" });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await getFeedback();
      setFeedback(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFeedback(formData);

      setFormData({
        title: "",
        description: "",
        category: "",
      });

      fetchFeedback();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditData({ title: item.title, description: item.description, category: item.category });
  };

  const handleUpdate = async (id) => {
    try {
      await updateFeedback(id, editData);
      setEditId(null);
      fetchFeedback();
    } catch (error) {
      console.error(error);
      alert("Failed to update feedback");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await deleteFeedback(id);
      fetchFeedback();
    } catch (error) {
      console.error(error);
      alert("Failed to delete feedback");
    }
  };

  /* Determine if we're showing sample data */
  const isShowingSample = !feedback || feedback.length === 0;
  const displayFeedback = isShowingSample ? sampleFeedback : feedback;

  /* Standard input classes for dark mode consistency */
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-all duration-300";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen dynamic background */}
      <DynamicBackground />

      {/* Main content — z-10 to stay above background */}
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-6xl mx-auto px-6 py-12"
        >
          {/* Header */}
          <div className="mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
            >
              Feedback
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 text-sm mt-1"
            >
              Share your thoughts, suggestions, or report issues
            </motion.p>
          </div>

          {/* Submit Panel — visible for logged-in users AND admins */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-12 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Submit Feedback</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  name="title"
                  placeholder="Feedback title..."
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />

                <textarea
                  name="description"
                  placeholder="Describe your feedback..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} min-h-[100px]`}
                />

                <input
                  name="category"
                  placeholder="Category (UI, Bug, Suggestion...)"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />

                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition duration-150 font-medium shadow-sm"
                  >
                    Submit Feedback
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Feedback List */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight"
          >
            All Feedback
          </motion.h2>

          {isShowingSample && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mb-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 rounded-xl"
            >
              <span className="text-base">💡</span>
              <span>No real data yet — showing sample data to preview the experience</span>
            </motion.div>
          )}

          <div className="space-y-4">
            {displayFeedback.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.07, 0.5) }}
                whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300"
              >
                {editId === item._id ? (
                  <div className="flex flex-col gap-4">
                    <input
                      className={inputClasses}
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                    <textarea
                      className={`${inputClasses} min-h-[100px]`}
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <input
                      className={inputClasses}
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    />
                    <div className="flex gap-2 justify-end">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdate(item._id)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium shadow-sm text-sm"
                      >
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditId(null)}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 font-medium text-sm"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">{item.description}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="inline-block px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-xl">
                          {item.category}
                        </span>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                          By: {item.user?.username || 'Unknown'}
                        </p>
                      </div>
                    </div>

                    {user && item.user?._id === user.id && (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditClick(item)}
                          className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-xl text-sm transition-colors duration-300 font-medium"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(item._id)}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-xl text-sm transition-colors duration-300 font-medium shadow-sm"
                        >
                          Delete
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Feedback;