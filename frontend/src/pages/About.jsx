import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Lightbulb, Shield, Globe } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const values = [
  { icon: <Heart size={22} />, title: "User-First", description: "Every decision starts with our users.", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/30" },
  { icon: <Lightbulb size={22} />, title: "Simplicity", description: "Complex problems deserve elegant solutions.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30" },
  { icon: <Shield size={22} />, title: "Transparency", description: "Open roadmaps, honest pricing, clear communication.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30" },
];

const team = [
  { name: "Alex Rivera", role: "Co-Founder & CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" },
  { name: "Sarah Chen", role: "Co-Founder & CTO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
  { name: "Marcus Johnson", role: "Head of Design", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
  { name: "Priya Sharma", role: "Lead Engineer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
];

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full mb-6"><Globe size={12} />Our Story</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">We believe products should be built <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">with users, not for them</span></h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">FeedbackHub was born from the frustration of managing product feedback across scattered tools. We built a single, beautiful platform where users and product teams collaborate in the open.</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-10 lg:p-16 mb-20 max-w-4xl mx-auto text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center mx-auto mb-6"><Target size={24} className="text-blue-600 dark:text-blue-400" /></div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto text-lg">To democratize product development by giving every user a voice and every team a clear path to building what truly matters.</p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} className="bg-white dark:bg-[#111827] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${v.bg} border flex items-center justify-center mb-5`}><span className={v.color}>{v.icon}</span></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Meet the Team</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-xl mx-auto">A small, passionate team building tools we wish we had.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <img src={m.image} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-gray-100 dark:ring-gray-800" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{m.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
