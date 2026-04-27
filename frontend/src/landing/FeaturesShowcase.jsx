import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, GitMerge, ShieldCheck, ChevronUp, Tag, BarChart3, Users, Settings } from "lucide-react";

const features = [
  {
    id: "upvote",
    icon: <ThumbsUp size={20} />,
    title: "Upvote Ideas",
    desc: "Let your community tell you what matters most by voting on feature requests.",
    preview: {
      title: "Community Voting",
      items: [
        { name: "Dark mode support", votes: 142, hot: true },
        { name: "Mobile app", votes: 98, hot: false },
        { name: "API access", votes: 76, hot: false },
      ],
    },
  },
  {
    id: "status",
    icon: <GitMerge size={20} />,
    title: "Track Status",
    desc: "Keep users in the loop with transparent statuses: pending, reviewed, and implemented.",
    preview: {
      title: "Status Board",
      items: [
        { name: "CSV Export", status: "Implemented", color: "emerald" },
        { name: "Webhooks", status: "Reviewed", color: "blue" },
        { name: "SSO Login", status: "Pending", color: "amber" },
      ],
    },
  },
  {
    id: "admin",
    icon: <ShieldCheck size={20} />,
    title: "Admin Moderation",
    desc: "Easily manage the board, update feature statuses, and delete off-topic suggestions.",
    preview: {
      title: "Admin Panel",
      items: [
        { name: "Total Requests", value: "284", icon: <BarChart3 size={14} /> },
        { name: "Active Users", value: "1.2k", icon: <Users size={14} /> },
        { name: "Pending Review", value: "12", icon: <Settings size={14} /> },
      ],
    },
  },
];

function UpvotePreview({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
            <ChevronUp size={14} className="text-blue-500" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.votes}</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{item.name}</span>
          {item.hot && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              🔥 Hot
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function StatusPreview({ items }) {
  const colorMap = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${colorMap[item.color]}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function AdminPreview({ items }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
            {item.icon}
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.name}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesShowcase() {
  const [active, setActive] = useState(0);
  const current = features[active];

  return (
    <section className="py-24 bg-white dark:bg-bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Everything you need to ship better
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            A clean, focused feature set designed to bring order to the chaos of product feedback.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-5 gap-8 items-start"
        >
          {/* Left: Feature tabs */}
          <div className="lg:col-span-2 space-y-2">
            {features.map((feature, i) => (
              <button
                key={feature.id}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group ${
                  active === i
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 shadow-sm"
                    : "bg-white dark:bg-[#111827] border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      active === i
                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold transition-colors duration-300 ${
                        active === i
                          ? "text-blue-700 dark:text-blue-400"
                          : "text-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Preview panel */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl shadow-gray-100/50 dark:shadow-black/20">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 ml-3">
                  {current.preview.title}
                </span>
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {current.id === "upvote" && <UpvotePreview items={current.preview.items} />}
                    {current.id === "status" && <StatusPreview items={current.preview.items} />}
                    {current.id === "admin" && <AdminPreview items={current.preview.items} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
