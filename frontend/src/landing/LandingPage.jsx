import React, { useEffect } from "react";
import Lenis from "lenis";
import NavbarLanding from "./NavbarLanding";
import HeroSection from "./HeroSection";
import ProblemSection from "./ProblemSection";
import FeaturesShowcase from "./FeaturesShowcase";
import LivePreviewCard from "./LivePreviewCard";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import Footer from "./Footer";
import InteractiveBackground from "../components/InteractiveBackground";
import FloatingElements from "../components/FloatingElements";

export default function LandingPage() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-[#0B0F14] dark:via-[#0F172A] dark:to-[#0B0F14] min-h-screen text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100 overflow-x-hidden">
      {/* Interactive particles behind all content */}
      <InteractiveBackground className="pointer-events-auto" />
      {/* Larger floating gradient shapes for depth */}
      <FloatingElements count={30} />

      {/* All sections rendered above the particles */}
      <div className="relative z-10">
        <NavbarLanding />
        <HeroSection />
        <ProblemSection />
        <FeaturesShowcase />
        <LivePreviewCard />
        <HowItWorks />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
