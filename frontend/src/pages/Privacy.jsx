import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const sections = [
  { title: "Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, submit feedback, or contact us for support. This includes your name, email address, and any other information you choose to provide. We also automatically collect certain information when you use our service, including your IP address, browser type, operating system, and usage data." },
  { title: "How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to respond to your comments and questions. We may also use the information to send you promotional communications, such as information about products, features, and events offered by FeedbackHub." },
  { title: "Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform, conducting our business, or serving our users. We may also disclose information when required by law or to protect our rights." },
  { title: "Data Security", content: "We implement appropriate technical and organizational measures to protect the security of your personal information. This includes encryption of data in transit and at rest, regular security audits, and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure." },
  { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information at any time. You can update your account information through your dashboard settings. You may also opt out of receiving promotional emails by following the unsubscribe instructions in those emails. If you wish to delete your account entirely, please contact our support team." },
  { title: "Cookies & Tracking", content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
  { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. You are advised to review this privacy policy periodically for any changes." },
];

export default function Privacy() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center"><Shield size={20} className="text-blue-600 dark:text-blue-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Last updated: April 1, 2026</p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">At FeedbackHub, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our services.</p>

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
