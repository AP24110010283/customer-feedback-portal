import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const sections = [
  { title: "Acceptance of Terms", content: "By accessing or using FeedbackHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service. The materials contained in this service are protected by applicable copyright and trademark law." },
  { title: "Use License", content: "Permission is granted to temporarily use FeedbackHub for personal or commercial purposes, subject to the restrictions in these Terms. This license does not include the right to modify, copy, or distribute the software, use the service for any unlawful purpose, attempt to reverse-engineer any software contained on the platform, or transfer your account to another party." },
  { title: "User Accounts", content: "When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your password secure. You must notify FeedbackHub immediately of any breach of security or unauthorized use. FeedbackHub will not be liable for any losses caused by unauthorized use of your account." },
  { title: "User Content", content: "You retain all rights to the content you submit through FeedbackHub, including feature requests, comments, and feedback. By submitting content, you grant FeedbackHub a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with operating and improving the service." },
  { title: "Prohibited Activities", content: "You agree not to use the service to: upload or transmit any malicious code; interfere with the proper working of the service; attempt to gain unauthorized access to any portion of the service; use automated means to access the service without our permission; or engage in any activity that violates applicable local, state, national, or international law." },
  { title: "Payment Terms", content: "Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as explicitly stated in our refund policy. FeedbackHub reserves the right to change its prices at any time, with 30 days notice for existing subscribers." },
  { title: "Limitation of Liability", content: "In no event shall FeedbackHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use FeedbackHub, even if FeedbackHub has been notified of the possibility of such damage." },
  { title: "Modifications to Terms", content: "FeedbackHub may revise these Terms of Service at any time without notice. By using this service, you are agreeing to be bound by the then-current version of these Terms of Service. We will make reasonable efforts to notify users of significant changes via email or in-app notification." },
];

export default function Terms() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center"><FileText size={20} className="text-blue-600 dark:text-blue-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Terms of Service</h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Last updated: April 1, 2026</p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">Please read these Terms of Service carefully before using FeedbackHub. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.</p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{section.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
