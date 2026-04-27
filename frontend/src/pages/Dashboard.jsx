import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getUserDashboard,
  getAdminDashboard,
} from "../services/dashboardService";
import { motion } from "framer-motion";

/* ---------- Status color helper ---------- */
const getStatusBadge = (status) => {
  const map = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    reviewed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    implemented: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return map[status] || map.pending;
};

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

useEffect(() => {
  if (user) {
    fetchDashboard();
  }
}, [user]);

  const fetchDashboard = async () => {
  try {
    console.log("User:", user);

    let res;

    if (user?.role === "admin") {
      res = await getAdminDashboard();
    } else {
      res = await getUserDashboard();
    }

    console.log("Response:", res);

    setData(res.data);
  } catch (error) {
    console.error("Dashboard error:", error);
  }
};

  if (!data)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-gray-500 dark:text-gray-400">Loading dashboard...</h2>
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
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Overview of your activity</p>
      </div>

      {user?.role === "admin" ? (
        <AdminDashboard data={data} />
      ) : (
        <UserDashboard data={data} />
      )}
    </motion.div>
  );
}

/* ---------- ADMIN DASHBOARD ---------- */

function AdminDashboard({ data }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Features" value={data.totalFeatures} />
        <StatCard title="Total Feedback" value={data.totalFeedback} />
        <StatCard title="Total Votes" value={data.totalVotes} />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">Top Features</h2>

      <div className="space-y-4">
        {data.features.map((feature, i) => (
          <motion.div
            key={feature._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.5) }}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">{feature.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F14] rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                👍 {feature.votes?.length || 0}
              </span>
              <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${getStatusBadge(feature.status)}`}>{feature.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- USER DASHBOARD ---------- */

function UserDashboard({ data }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">My Features</h2>

      {data.features.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 bg-gray-50 dark:bg-[#0B0F14] p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          No features submitted yet.
        </p>
      )}

      <div className="space-y-4 mb-12">
        {data.features.map((feature, i) => (
          <motion.div
            key={feature._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.5) }}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${getStatusBadge(feature.status)}`}>{feature.status}</span>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">My Feedback</h2>

      {data.feedback.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-[#0B0F14] p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          No feedback submitted yet.
        </p>
      )}

      <div className="space-y-4">
        {data.feedback.map((fb, i) => (
          <motion.div
            key={fb._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.5) }}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{fb.title}</h3>
            <span className="inline-block mt-3 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-xl">
              {fb.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]">
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">{title}</p>
      <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{value}</h2>
    </div>
  );
}

export default Dashboard;