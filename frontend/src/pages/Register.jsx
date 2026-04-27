import React, { useState, useEffect, useContext } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white dark:bg-[#0B0F14] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-[#111827] dark:focus:ring-blue-500/30 dark:focus:border-blue-500/50 transition-all duration-300";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-[#111827] p-8 lg:p-10 border border-gray-200 dark:border-gray-700/80 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 transition-colors duration-300">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
            >
              Create your account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-gray-500 dark:text-gray-400 text-sm mt-2"
            >
              Start building with feedback
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Username</label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
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
              transition={{ delay: 0.35, duration: 0.4 }}
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
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
            >
              Create Account
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>
          </form>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;