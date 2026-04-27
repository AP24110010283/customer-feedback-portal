import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const jobs = [
  { title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time", description: "Build beautiful, performant React interfaces that delight our users." },
  { title: "Backend Engineer", department: "Engineering", location: "Remote", type: "Full-time", description: "Design and scale our Node.js APIs and MongoDB infrastructure." },
  { title: "Product Designer", department: "Design", location: "Remote", type: "Full-time", description: "Shape the future of how teams collect and manage user feedback." },
  { title: "Developer Advocate", department: "Marketing", location: "Remote", type: "Full-time", description: "Create content, speak at events, and help developers succeed with FeedbackHub." },
  { title: "Customer Success Manager", department: "Support", location: "Remote", type: "Full-time", description: "Help our customers get the most out of FeedbackHub and drive retention." },
];

const perks = ["Fully remote team", "Unlimited PTO", "Health & wellness stipend", "Home office budget", "Learning & growth fund", "Equity for all employees"];

export default function Careers() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full mb-6"><Heart size={12} />Join Us</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Build the future of product feedback</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">We're a remote-first team passionate about helping product teams build what users actually want.</p>
        </div>

        {/* Perks */}
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 mb-16 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Why work with us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }} className="group bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1"><Briefcase size={12} />{job.department}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{job.type}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
                    Apply <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
