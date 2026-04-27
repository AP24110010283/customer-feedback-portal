import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">Have a question, suggestion, or just want to say hello? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@feedbackhub.io", sub: "We reply within 24 hours" },
              { icon: <MessageSquare size={20} />, label: "Live Chat", value: "Available Mon–Fri", sub: "9 AM – 6 PM EST" },
              { icon: <MapPin size={20} />, label: "Office", value: "San Francisco, CA", sub: "United States" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{item.value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300 resize-none" placeholder="Tell us more..." />
              </div>
              <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm shadow-blue-600/20">
                Send Message <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
