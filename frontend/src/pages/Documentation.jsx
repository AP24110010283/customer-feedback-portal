import React from "react";
import { motion } from "framer-motion";
import { Book, Zap, Code, Settings, Shield, Webhook } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const sections = [
  { icon: <Zap size={20} />, title: "Getting Started", description: "Quick setup guide to get FeedbackHub running for your team in under 5 minutes.", articles: ["Creating your account", "Setting up your first board", "Inviting team members", "Customizing your portal"] },
  { icon: <Book size={20} />, title: "Core Concepts", description: "Understand the fundamentals of FeedbackHub and how everything connects.", articles: ["Feature requests lifecycle", "Upvoting & ranking system", "Status management workflow", "User roles & permissions"] },
  { icon: <Code size={20} />, title: "API Reference", description: "Integrate FeedbackHub into your existing tools and workflows.", articles: ["Authentication & API keys", "REST API endpoints", "Webhooks reference", "Rate limits & pagination"] },
  { icon: <Webhook size={20} />, title: "Integrations", description: "Connect FeedbackHub with the tools your team already uses.", articles: ["Slack integration", "Discord integration", "Jira sync", "Custom webhooks"] },
  { icon: <Settings size={20} />, title: "Administration", description: "Configure and manage your FeedbackHub workspace.", articles: ["Workspace settings", "Custom branding & themes", "Email notifications", "Data export & backup"] },
  { icon: <Shield size={20} />, title: "Security & Compliance", description: "Learn about our security practices and compliance certifications.", articles: ["Data encryption", "SSO / SAML setup", "Audit logs", "GDPR compliance"] },
];

export default function Documentation() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Documentation</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">Everything you need to know about using FeedbackHub, from quick start guides to API references.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sections.map((section, i) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">{section.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{section.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{section.description}</p>
              <ul className="space-y-2">
                {section.articles.map((article) => (
                  <li key={article} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500 shrink-0" />
                    {article}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
