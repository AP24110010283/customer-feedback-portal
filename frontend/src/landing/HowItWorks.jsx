import React from "react";
import { motion } from "framer-motion";
import { Send, TrendingUp, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Send size={24} />,
    title: "Submit Ideas",
    desc: "Users share their feedback and feature requests directly through a clean portal.",
  },
  {
    num: "02",
    icon: <TrendingUp size={24} />,
    title: "Community Votes",
    desc: "The best ideas naturally rise to the top as your user base upvotes what they need.",
  },
  {
    num: "03",
    icon: <Rocket size={24} />,
    title: "Ship & Update",
    desc: "Your team marks ideas as 'implemented', keeping the community engaged and updated.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-900 dark:bg-surface-dark px-6 relative overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            How FeedbackHub Works
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Three simple steps to a better product roadmap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-blue-500/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative text-center group"
            >
              {/* Step circle */}
              <div className="relative mx-auto mb-8">
                <div className="w-20 h-20 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center relative z-10 border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300">
                  <span className="text-blue-400">{step.icon}</span>
                </div>
                {/* Glow on hover */}
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Step number badge */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-xs font-bold text-white z-20 shadow-lg shadow-blue-500/30">
                  {step.num}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed px-4 max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
