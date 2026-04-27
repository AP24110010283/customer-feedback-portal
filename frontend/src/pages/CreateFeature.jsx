import React, { useState } from "react";
import { createFeature } from "../services/featureService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DynamicBackground from "../components/DynamicBackground";

function CreateFeature() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFeature(formData);
      alert("Feature created");
      navigate("/features");
    } catch (error) {
      alert("Error creating feature");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen dynamic background */}
      <DynamicBackground />

      {/* Content layer — z-10 stays above background */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-md mx-auto mt-12 bg-white dark:bg-[#111827] p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-colors duration-300"
        >
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Create Feature Request</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Describe the feature you'd like to see</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
            >
              <input
                name="title"
                placeholder="Feature Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.18 }}
            >
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-all duration-300 min-h-[120px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.24 }}
              className="flex justify-end mt-2"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition duration-150 font-medium shadow-sm"
              >
                Create Feature
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateFeature;