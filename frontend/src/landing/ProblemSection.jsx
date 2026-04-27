import React from "react";
import { motion } from "framer-motion";
import { MessageSquareOff, Target, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: <MessageSquareOff size={24} />,
    title: "Scattered Feedback",
    desc: "Feedback is lost in emails, Slack threads, and customer support tickets.",
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30",
  },
  {
    icon: <Target size={24} />,
    title: "No Clear Priorities",
    desc: "Engineering teams guess what to build next instead of knowing what users need.",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30",
  },
  {
    icon: <AlertCircle size={24} />,
    title: "Missed User Needs",
    desc: "Users churn because their most critical requests are ignored or forgotten.",
    color: "text-orange-500 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            The old way is broken
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Without a centralized system, building the right features is a guessing game.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white dark:bg-[#111827] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-black/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${prob.bg} border flex items-center justify-center mb-6`}>
                <span className={prob.color}>{prob.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {prob.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
