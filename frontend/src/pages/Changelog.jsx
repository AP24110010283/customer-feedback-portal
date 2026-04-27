import React from "react";
import { motion } from "framer-motion";
import { Tag, Rocket, Bug, Zap } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const changelog = [
  {
    version: "2.4.0",
    date: "April 2026",
    type: "feature",
    icon: <Rocket size={16} />,
    title: "Advanced Analytics Dashboard",
    description:
      "A completely redesigned analytics experience with real-time charts, custom date ranges, and exportable reports for deeper product insights.",
    tags: ["Analytics", "Dashboard"],
  },
  {
    version: "2.3.2",
    date: "March 2026",
    type: "improvement",
    icon: <Zap size={16} />,
    title: "Performance Improvements",
    description:
      "Reduced page load times by 40% with optimized database queries and lazy-loaded components across the entire application.",
    tags: ["Performance"],
  },
  {
    version: "2.3.0",
    date: "February 2026",
    type: "feature",
    icon: <Rocket size={16} />,
    title: "Slack & Webhook Integrations",
    description:
      "Get real-time notifications in your favorite tools. Supports Slack, Discord, and custom webhooks for new requests and status changes.",
    tags: ["Integrations", "Notifications"],
  },
  {
    version: "2.2.1",
    date: "January 2026",
    type: "bugfix",
    icon: <Bug size={16} />,
    title: "Bug Fixes & Stability",
    description:
      "Fixed upvote count sync issues, resolved email notification delays, and improved session management for concurrent users.",
    tags: ["Bug Fix", "Stability"],
  },
  {
    version: "2.2.0",
    date: "December 2025",
    type: "feature",
    icon: <Rocket size={16} />,
    title: "Dark Mode & Custom Themes",
    description:
      "Full dark mode support across the entire application with a system preference toggle and customizable brand colors.",
    tags: ["UI/UX", "Theming"],
  },
];

const typeStyles = {
  feature:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  improvement:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  bugfix:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const typeLabels = {
  feature: "New Feature",
  improvement: "Improvement",
  bugfix: "Bug Fix",
};

export default function Changelog() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
            Stay up to date with the latest improvements, new features, and bug
            fixes we ship to FeedbackHub.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-10">
              {changelog.map((entry, i) => (
                <motion.div
                  key={entry.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <div className="absolute left-[12px] top-1.5 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-bg-dark z-10" />

                  <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-mono font-semibold text-gray-400 dark:text-gray-500">
                        v{entry.version}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {entry.date}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${typeStyles[entry.type]}`}
                      >
                        {entry.icon}
                        {typeLabels[entry.type]}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
