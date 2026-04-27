import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 dark:bg-[#0B0F14]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">

        {/* Logo / Title — bigger, premium feel */}
        <Link to="/" className="group">
          <motion.h1
            className="text-[1.65rem] font-bold text-gray-900 dark:text-gray-100 tracking-tight cursor-pointer select-none"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Feedback<span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Hub</span>
          </motion.h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {user ? (
            <>
              {[
                { to: "/features", label: "Features" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/feedback", label: "Feedback" },
                ...(user.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-2 rounded-lg hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}

              <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1" />

              <span className="text-gray-400 dark:text-gray-500 text-xs px-2">
                {user.name}
              </span>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={handleLogout}
                className="ml-1 bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-[0.97] transition-all duration-200 font-medium text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <Link to="/login" className="px-3 py-2 rounded-lg hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200">
                Login
              </Link>

              <Link
                to="/register"
                className="ml-1 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-sm shadow-blue-600/20 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;