import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Tag, MessageSquare, Clock } from "lucide-react";

const mockFeatures = [
  {
    id: 1,
    title: "Dark mode support",
    description: "Add a dark theme option for the entire application to reduce eye strain.",
    votes: 142,
    status: "Implemented",
    tag: "UI/UX",
    comments: 23,
    time: "2 days ago",
  },
  {
    id: 2,
    title: "CSV export for analytics",
    description: "Allow users to export their feedback analytics data as CSV files.",
    votes: 89,
    status: "Reviewed",
    tag: "Feature",
    comments: 15,
    time: "5 days ago",
  },
  {
    id: 3,
    title: "Slack integration",
    description: "Get notified in Slack when new feature requests are submitted or upvoted.",
    votes: 67,
    status: "Pending",
    tag: "Integration",
    comments: 8,
    time: "1 week ago",
  },
];

const statusStyles = {
  Implemented: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Reviewed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function FeatureCard({ feature, index }) {
  const [votes, setVotes] = useState(feature.votes);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) {
      setVotes(feature.votes);
      setVoted(false);
    } else {
      setVotes(feature.votes + 1);
      setVoted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-4 p-5 rounded-xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md hover:shadow-gray-100/50 dark:hover:shadow-black/20 transition-all duration-300"
    >
      {/* Vote button */}
      <button
        onClick={handleVote}
        className={`flex flex-col items-center gap-1 min-w-[48px] p-2 rounded-xl border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${
          voted
            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-500"
        }`}
      >
        <ChevronUp size={16} className={voted ? "text-blue-500" : ""} />
        <motion.span
          key={votes}
          initial={{ scale: 1.3, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-bold"
        >
          {votes}
        </motion.span>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{feature.title}</h4>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[feature.status]}`}>
            {feature.status}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
          {feature.description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Tag size={10} /> {feature.tag}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <MessageSquare size={10} /> {feature.comments}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Clock size={10} /> {feature.time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function LivePreviewCard() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            A clean interface your users will love. Try clicking the upvote buttons.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/20">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 ml-2">
                  Feature Requests
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 px-3 rounded-md bg-blue-600 dark:bg-blue-500 flex items-center">
                  <span className="text-[10px] text-white font-medium">+ New Request</span>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div className="p-4 space-y-3">
              {mockFeatures.map((feature, i) => (
                <FeatureCard key={feature.id} feature={feature} index={i} />
              ))}
            </div>
          </div>

          {/* Subtle glow */}
          <div className="relative -mt-1">
            <div className="absolute inset-x-8 -top-1 h-20 bg-gradient-to-b from-blue-500/5 to-transparent dark:from-blue-500/3 rounded-b-3xl blur-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
