import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const categories = [
  {
    title: "Getting Started",
    faqs: [
      { q: "How do I create an account?", a: "Click the 'Get Started' button on our homepage. You can sign up with your email address — no credit card required for the free plan." },
      { q: "Can I try FeedbackHub for free?", a: "Absolutely! Our Starter plan is completely free and includes up to 50 feature requests, community upvoting, and basic status tracking." },
      { q: "How do I invite my team members?", a: "Go to your workspace settings and click 'Invite Members'. You can invite team members via email and assign them roles like Admin or Member." },
    ],
  },
  {
    title: "Features & Functionality",
    faqs: [
      { q: "How does the upvoting system work?", a: "Users can upvote feature requests they want to see implemented. The most popular requests rise to the top, giving your team clear signal on what to build next." },
      { q: "Can I customize the look of my feedback portal?", a: "Yes! Pro and Enterprise plans include custom branding options. You can change colors, add your logo, and customize the portal to match your brand." },
      { q: "What integrations are available?", a: "We support Slack, Discord, Jira, and custom webhooks. More integrations are being added regularly based on user requests." },
    ],
  },
  {
    title: "Billing & Plans",
    faqs: [
      { q: "Can I upgrade or downgrade at any time?", a: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your current billing period." },
      { q: "Do you offer discounts for annual billing?", a: "Yes! You save 20% when you choose annual billing over monthly. Contact our sales team for enterprise volume discounts." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Enterprise customers can pay via invoice." },
    ],
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 pr-4">{faq.q}</span>
        <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpCenter() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full mb-6"><HelpCircle size={12} />Support</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Help Center</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">Find answers to frequently asked questions and learn how to get the most out of FeedbackHub.</p>
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search for answers..." className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-300 bg-white dark:bg-[#111827] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 transition-colors duration-300" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{cat.title}</h2>
              <div className="space-y-3">
                {cat.faqs.map((faq) => (<FAQItem key={faq.q} faq={faq} />))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
