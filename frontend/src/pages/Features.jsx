import React, { useEffect, useState, useContext } from "react";
import {
  getFeatures,
  upvoteFeature,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../services/featureService";
import { AuthContext } from "../context/AuthContext";
import { updateFeatureStatus } from "../services/adminService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sampleFeatures } from "../data/sampleData";

/* ---------- Status color helper ---------- */
const statusStyles = {
  pending: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    button: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50",
  },
  reviewed: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    button: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
  },
  implemented: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    button: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50",
  },
};

const getStatusBadge = (status) => statusStyles[status]?.badge || statusStyles.pending.badge;
const getStatusButton = (status) => statusStyles[status]?.button || statusStyles.pending.button;

function Features() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const res = await getFeatures();
      setFeatures(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await upvoteFeature(id);
      fetchFeatures();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateFeatureStatus(id, status);
      fetchFeatures();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (feature) => {
    setEditId(feature._id);
    setEditData({ title: feature.title, description: feature.description });
  };

  const handleUpdate = async (id) => {
    try {
      await updateFeature(id, editData);
      setEditId(null);
      fetchFeatures();
    } catch (error) {
      console.error(error);
      alert("Failed to update feature");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      await deleteFeature(id);
      fetchFeatures();
    } catch (error) {
      console.error(error);
      alert("Failed to delete feature");
    }
  };

  /* ---------- Filter Logic ---------- */
  const isShowingSample = !features || features.length === 0;
  const displayFeatures = isShowingSample ? sampleFeatures : features;

  const filteredFeatures = displayFeatures
    .filter((feature) => {
      if (filter === "all") return true;
      if (filter === "pending") return feature.status === "pending";
      if (filter === "reviewed") return feature.status === "reviewed";
      if (filter === "implemented") return feature.status === "implemented";
      return true;
    })
    .sort((a, b) => {
      if (filter === "most-voted") {
        return (b.votes?.length || 0) - (a.votes?.length || 0);
      }
      if (filter === "latest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Feature Requests</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Explore ideas and help shape the product</p>
        </div>

        {user && (
          <Link to="/create-feature">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition duration-150 font-medium shadow-sm"
            >
              New Feature
            </motion.button>
          </Link>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          "all",
          "most-voted",
          "latest",
          "pending",
          "reviewed",
          "implemented",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1.5 rounded-xl text-sm capitalize transition-all duration-200 font-medium ${
              filter === item
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {item.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* SAMPLE DATA NOTICE */}
      {isShowingSample && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 rounded-xl"
        >
          <span className="text-base">💡</span>
          <span>No real data yet — showing sample data to preview the experience</span>
        </motion.div>
      )}

      {/* FEATURE LIST */}
      <div className="space-y-4">
        {filteredFeatures.map((feature, i) => (
          <motion.div
            key={feature._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.5) }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.12)" }}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300"
          >
            {editId === feature._id ? (
              <div className="flex flex-col gap-3">
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300"
                  rows="3"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(feature._id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                  {/* Ownership actions */}
                  {user && feature.user?._id === user.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(feature)}
                        className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-xl text-sm transition-colors duration-300 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature._id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-xl text-sm transition-colors duration-300 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F14] rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      👍 {feature.votes?.length || 0}
                    </span>

                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${getStatusBadge(feature.status)}`}
                    >
                      {feature.status}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }
                      handleUpvote(feature._id);
                    }}
                    className={`${
                      user && feature.votes?.includes(user.id)
                        ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } px-5 py-2 rounded-xl active:scale-95 transition-all duration-200 shadow-sm font-medium text-sm flex items-center gap-2`}
                  >
                    {user && feature.votes?.includes(user.id) ? "Upvoted" : "Upvote"}
                  </button>
                </div>

                {!user && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">
                    Login to vote and submit ideas
                  </p>
                )}

                {/* ADMIN CONTROLS (Status only) */}
                {user?.role === "admin" && (
                  <div className="flex gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 items-center flex-wrap">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">Admin Controls</span>
                    <button
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("pending")}`}
                      onClick={() => handleStatus(feature._id, "pending")}
                    >
                      Pending
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("reviewed")}`}
                      onClick={() => handleStatus(feature._id, "reviewed")}
                    >
                      Reviewed
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("implemented")}`}
                      onClick={() => handleStatus(feature._id, "implemented")}
                    >
                      Implemented
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Features;