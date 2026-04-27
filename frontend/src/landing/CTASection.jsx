import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-bg-dark px-6 border-t border-gray-100 dark:border-gray-800/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-3xl p-12 lg:p-20 shadow-2xl shadow-blue-600/20 dark:shadow-blue-900/30 overflow-hidden"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs font-medium text-blue-100 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full mb-6"
          >
            <Sparkles size={12} />
            Free to get started
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6 text-balance">
            Start building with user feedback today
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join modern product teams who use FeedbackHub to turn scattered requests into a clear, prioritized roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-black/10"
            >
              Get Started Free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
