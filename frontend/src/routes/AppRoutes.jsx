import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

import Dashboard from "../pages/Dashboard";
import Features from "../pages/Features";
import Feedback from "../pages/Feedback";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import CreateFeature from "../pages/CreateFeature";
import AdminDashboard from "../pages/AdminDashboard";
import LandingPage from "../landing/LandingPage";

// Footer pages
import Pricing from "../pages/Pricing";
import Changelog from "../pages/Changelog";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Careers from "../pages/Careers";
import Documentation from "../pages/Documentation";
import HelpCenter from "../pages/HelpCenter";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import ScrollToTop from "../components/ScrollToTop";


/* 🔥 Page Transition Wrapper */
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Pages that use their own NavbarLanding + Footer (standalone layout)
const STANDALONE_PAGES = ["/", "/pricing", "/changelog", "/about", "/blog", "/careers", "/docs", "/help", "/contact", "/privacy", "/terms"];

function AppRoutes() {
  const location = useLocation();
  const isStandalonePage = STANDALONE_PAGES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F14] transition-colors duration-300">
      <ScrollToTop />
      {!isStandalonePage && <Navbar />}

      <div className={!isStandalonePage ? "py-6" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

            {/* Footer Pages (standalone with their own navbar/footer) */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Protected Routes */}
            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Features />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Dashboard />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Feedback />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-feature"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <CreateFeature />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <PageWrapper>
                    <AdminDashboard />
                  </PageWrapper>
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AppRoutes;