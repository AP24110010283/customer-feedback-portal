import React, { useState, useEffect, useContext } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";
import FloatingElements from "../components/FloatingElements";

/* Floating glass card for the visual side */
function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-4 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: res.data.token,
          role: res.data.user.role,
          name: res.data.user.username,
          id: res.data.user._id
        })
      );
      
      setUser({
        token: res.data.token,
        role: res.data.user.role,
        name: res.data.user.username,
        id: res.data.user._id,
      });

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:bg-[#0B0F14] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-[#111827] dark:focus:ring-blue-500/30 dark:focus:border-blue-500/50 transition-all duration-300";

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Full-viewport gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-[#0B0F14] dark:via-[#0F172A] dark:to-[#111827]" />
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-float-slower pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-300/8 dark:bg-indigo-500/3 rounded-full blur-3xl animate-float-slowest pointer-events-none" />
      {/* Floating elements layer */}
      <FloatingElements count={25} />
      {/* Existing content — untouched */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 items-center">
        
        {/* Left side — visual element */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex flex-col items-center justify-center relative"
        >
          {/* Gradient background blob */}
          <div className="relative w-full aspect-square max-w-md">
            {/* Animated gradient orb */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-90 dark:opacity-80 animate-gradient-shift" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-blue-500/50 via-transparent to-purple-500/30 animate-gradient-shift-reverse" />
            
            {/* Floating glass cards */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
              <GlassCard delay={0.3} className="w-full max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Collect Feedback</p>
                    <p className="text-white/60 text-xs">From your users</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.5} className="w-full max-w-[280px] ml-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Zap size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Prioritize Ideas</p>
                    <p className="text-white/60 text-xs">Community voting</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.7} className="w-full max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Ship with Confidence</p>
                    <p className="text-white/60 text-xs">Data-driven roadmap</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>

        {/* Right side — login form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
        >
          <div className="bg-white dark:bg-[#111827] p-8 lg:p-10 border border-gray-200 dark:border-gray-700/80 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 transition-colors duration-300">
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
              >
                Welcome back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-gray-500 dark:text-gray-400 text-sm mt-2"
              >
                Sign in to your account to continue
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
              >
                Sign in
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            </form>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400"
            >
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Register
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

export default Login;