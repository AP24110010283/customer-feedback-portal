import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "FeedbackHub completely transformed how we prioritize our roadmap. We no longer guess what users want; they tell us directly.",
  },
  {
    name: "David Chen",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The admin interface is so clean. Managing incoming requests and updating statuses takes me less than 10 minutes a day.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Loved by Product Teams
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            See what others are saying about FeedbackHub.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-white dark:bg-[#111827] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-black/20 transition-all duration-300"
            >
              {/* Quote decoration */}
              <div className="absolute top-6 right-6 text-gray-100 dark:text-gray-800">
                <Quote size={32} />
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{test.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{test.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
