import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/dashboardService";
import { updateFeatureStatus } from "../services/adminService";
import { deleteFeature } from "../services/featureService";
import { motion } from "framer-motion";

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

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAdminDashboard();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateFeatureStatus(id, status);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      await deleteFeature(id);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete feature");
    }
  };

  if (!data) return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-gray-500 dark:text-gray-400">Loading admin dashboard...</h2>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Overview of activity and moderation controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Features</p>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{data.totalFeatures}</h2>
        </div>
        <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Feedback</p>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{data.totalFeedback}</h2>
        </div>
        <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Votes</p>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{data.totalVotes}</h2>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">Manage Features</h2>

      <div className="space-y-4">
        {data.features.map((feature, i) => (
          <motion.div 
            key={feature._id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.5) }}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F14] rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    👍 {feature.votes?.length || 0}
                  </span>
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${getStatusBadge(feature.status)}`}>{feature.status}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleDelete(feature._id)}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm transition-colors duration-300 font-medium active:scale-95 shadow-sm"
                >
                  Delete Feature
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleStatus(feature._id, "pending")} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("pending")}`}>Pending</button>
                  <button onClick={() => handleStatus(feature._id, "reviewed")} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("reviewed")}`}>Reviewed</button>
                  <button onClick={() => handleStatus(feature._id, "implemented")} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusButton("implemented")}`}>Implemented</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default AdminDashboard;