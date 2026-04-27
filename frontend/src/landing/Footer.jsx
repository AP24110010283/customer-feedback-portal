import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Changelog", to: "/changelog" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
  ],
  Resources: [
    { label: "Documentation", to: "/docs" },
    { label: "Help Center", to: "/help" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-bg-dark border-t border-gray-100 dark:border-gray-800/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Feedback<span className="text-blue-600 dark:text-blue-500">Hub</span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed max-w-[200px]">
                The modern way to collect and prioritize user feedback.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} FeedbackHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
