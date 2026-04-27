import React from "react";
import { motion } from "framer-motion";

// Abstract placeholder logos — simple geometric shapes representing companies
function LogoPlaceholder({ shape, label }) {
  const shapes = {
    circle: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="16" fill="currentColor" />
      </svg>
    ),
    square: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="6" y="6" width="28" height="28" rx="6" fill="currentColor" />
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="6" y="6" width="28" height="28" rx="4" fill="currentColor" transform="rotate(45 20 20)" />
      </svg>
    ),
    hexagon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" fill="currentColor" />
      </svg>
    ),
    triangle: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,4 36,34 4,34" fill="currentColor" />
      </svg>
    ),
    pill: (
      <svg viewBox="0 0 60 30" className="w-12 h-6">
        <rect x="2" y="2" width="56" height="26" rx="13" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-2 text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-600 transition-colors duration-300">
      {shapes[shape]}
      <span className="text-sm font-semibold tracking-wide hidden sm:inline">{label}</span>
    </div>
  );
}

const logos = [
  { shape: "circle", label: "Acme" },
  { shape: "hexagon", label: "Nebula" },
  { shape: "square", label: "Vertex" },
  { shape: "diamond", label: "Prism" },
  { shape: "triangle", label: "Apex" },
  { shape: "pill", label: "Oxide" },
];

export default function TrustBar() {
  return (
    <section className="py-12 lg:py-16 px-6 border-y border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-bg-dark">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <p className="text-center text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-8">
          Trusted by product teams worldwide
        </p>
        <div className="flex items-center justify-center flex-wrap gap-8 lg:gap-14">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <LogoPlaceholder shape={logo.shape} label={logo.label} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
