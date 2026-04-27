import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const posts = [
  { title: "How We Reduced Churn by 30% Using Feature Voting", excerpt: "Learn how transparent feedback loops helped us retain more customers and build stronger relationships.", category: "Case Study", date: "Apr 18, 2026", readTime: "6 min read", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { title: "The Product Manager's Guide to User Feedback", excerpt: "A comprehensive guide to collecting, organizing, and acting on user feedback at scale.", category: "Guide", date: "Apr 10, 2026", readTime: "12 min read", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { title: "Why We Built FeedbackHub in Public", excerpt: "Our journey from a side project to a product used by hundreds of teams worldwide.", category: "Behind the Scenes", date: "Mar 28, 2026", readTime: "8 min read", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { title: "5 Mistakes Teams Make with Feature Requests", excerpt: "Common pitfalls in managing feature requests and how to avoid them for a healthier roadmap.", category: "Best Practices", date: "Mar 15, 2026", readTime: "5 min read", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { title: "Introducing Advanced Analytics", excerpt: "Deep dive into our new analytics dashboard with real-time charts and exportable reports.", category: "Product Update", date: "Mar 5, 2026", readTime: "4 min read", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
  { title: "Building a Feedback Culture at Your Company", excerpt: "How to foster a culture where everyone — from engineers to executives — values user input.", category: "Culture", date: "Feb 20, 2026", readTime: "7 min read", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
];

export default function Blog() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">Insights on product management, user feedback, and building great software.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="group bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-black/20 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${post.color}`}>{post.category}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{post.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
                <ArrowRight size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
