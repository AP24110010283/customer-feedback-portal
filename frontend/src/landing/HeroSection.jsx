import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronUp, MessageSquare, Tag } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Floating shape component
function FloatingShape({ className, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// Mini product preview for the hero — with tilt/parallax on hover
function HeroPreview() {
  const mockItems = [
    { title: "Dark mode support", votes: 142, status: "Implemented", tag: "UI/UX" },
    { title: "CSV export for reports", votes: 89, status: "Reviewed", tag: "Feature" },
    { title: "Slack integration", votes: 67, status: "Pending", tag: "Integration" },
  ];

  const statusColor = {
    Implemented: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    Reviewed: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  };

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-8">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-md h-5 max-w-[200px] mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {mockItems.map((mockItem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200 cursor-default"
          >
            <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
              <ChevronUp size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{mockItem.votes}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{mockItem.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[mockItem.status]}`}>
                  {mockItem.status}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <Tag size={8} /> {mockItem.tag}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);

  // Mouse parallax for the preview card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 pb-16 lg:pt-40 lg:pb-28 overflow-hidden px-6"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-100/40 via-indigo-50/30 to-transparent dark:from-blue-900/20 dark:via-indigo-900/10 dark:to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating shapes */}
      <FloatingShape
        className="w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 top-20 -left-20"
        delay={0}
        duration={6}
      />
      <FloatingShape
        className="w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/8 top-40 -right-32"
        delay={2}
        duration={8}
      />
      <FloatingShape
        className="w-48 h-48 bg-purple-200/20 dark:bg-purple-500/8 bottom-20 left-1/4"
        delay={4}
        duration={10}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full mb-6">
              <MessageSquare size={12} />
              Product feedback, simplified
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-[1.08] text-balance"
          >
            Build What Users{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
              Actually Want
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg"
          >
            Collect feedback, prioritize ideas, and ship better products faster with our streamlined feature request portal.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-7 py-3.5 rounded-full font-medium hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Get Started{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-sm"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Preview card with mouse parallax + tilt */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            x: parallaxX,
            y: parallaxY,
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="relative"
        >
          <HeroPreview />
          {/* Multi-layer glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-3xl blur-2xl -z-10" />
          <div className="absolute -inset-8 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 dark:from-blue-400/3 dark:via-purple-400/3 dark:to-pink-400/3 rounded-3xl blur-3xl -z-20" />
        </motion.div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-[#0B0F14] to-transparent pointer-events-none" />
    </section>
  );
}
