import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import NavbarLanding from "../landing/NavbarLanding";
import Footer from "../landing/Footer";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for side projects and small teams getting started.",
    features: [
      "Up to 50 feature requests",
      "Community upvoting",
      "Basic status tracking",
      "1 admin user",
      "Email notifications",
    ],
    cta: "Get Started Free",
    highlighted: false,
    gradient: "from-gray-50 to-white dark:from-gray-800/50 dark:to-surface-dark",
    border: "border-gray-200 dark:border-gray-700",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more power and flexibility.",
    features: [
      "Unlimited feature requests",
      "Priority upvoting & sorting",
      "Advanced analytics dashboard",
      "Up to 10 admin users",
      "Custom branding & themes",
      "Slack & webhook integrations",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    gradient: "from-blue-600 to-indigo-600",
    border: "border-blue-500/50",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations with advanced security needs.",
    features: [
      "Everything in Pro",
      "SSO / SAML authentication",
      "Dedicated account manager",
      "Unlimited admin users",
      "Custom SLA & uptime guarantee",
      "API access & bulk export",
      "Audit logs & compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: "from-gray-50 to-white dark:from-gray-800/50 dark:to-surface-dark",
    border: "border-gray-200 dark:border-gray-700",
  },
];

export default function Pricing() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-bg-dark dark:to-bg-dark min-h-screen">
      <NavbarLanding />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={12} />
            Simple, transparent pricing
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            Plans for every team size
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl border ${plan.border} overflow-hidden ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl shadow-blue-600/20 scale-[1.03]"
                  : "bg-white dark:bg-[#111827] shadow-sm hover:shadow-lg hover:-translate-y-1"
              } transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500/20 text-center py-1.5">
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.highlighted ? "pt-12" : ""}`}>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.highlighted ? "text-white" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          plan.highlighted ? "text-blue-200" : "text-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.highlighted
                            ? "text-blue-50"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${
                    plan.highlighted
                      ? "bg-white dark:bg-[#111827] text-blue-600 hover:bg-gray-50 shadow-lg shadow-black/10"
                      : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm shadow-blue-600/20"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
