import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * FloatingElements — Reusable animated visual layer.
 * 25–35 soft blurred shapes that drift and react to cursor.
 * GPU-friendly: uses transform only.
 */

const COLORS = [
  "from-blue-400/10 to-blue-600/5",
  "from-indigo-400/10 to-indigo-600/5",
  "from-purple-400/10 to-purple-600/5",
  "from-pink-400/8 to-pink-500/4",
  "from-blue-500/8 to-indigo-400/4",
  "from-violet-400/10 to-violet-600/5",
];

const DARK_COLORS = [
  "dark:from-blue-500/8 dark:to-blue-700/3",
  "dark:from-indigo-500/8 dark:to-indigo-700/3",
  "dark:from-purple-500/8 dark:to-purple-700/3",
  "dark:from-pink-500/6 dark:to-pink-700/2",
  "dark:from-blue-600/6 dark:to-indigo-500/3",
  "dark:from-violet-500/8 dark:to-violet-700/3",
];

function generateElements(count) {
  return Array.from({ length: count }, (_, i) => {
    const colorIdx = i % COLORS.length;
    return {
      id: i,
      // Random position
      left: Math.random() * 100,
      top: Math.random() * 100,
      // Size: 40–180px (mix of small and large)
      size: Math.random() * 140 + 40,
      // Shape: 60% circles, 40% rounded-rects
      shape: Math.random() > 0.4 ? "rounded-full" : "rounded-3xl",
      // Color
      gradient: COLORS[colorIdx],
      darkGradient: DARK_COLORS[colorIdx],
      // Animation timing
      durationY: 12 + Math.random() * 18,    // 12–30s vertical drift
      durationX: 15 + Math.random() * 15,    // 15–30s horizontal drift
      durationScale: 8 + Math.random() * 12, // 8–20s scale pulse
      delayY: Math.random() * -30,
      delayX: Math.random() * -30,
      // Drift ranges
      driftY: 15 + Math.random() * 25,
      driftX: 10 + Math.random() * 20,
      // Scale range
      scaleMin: 0.85 + Math.random() * 0.1,
      scaleMax: 1.0 + Math.random() * 0.15,
      // Opacity
      opacity: 0.04 + Math.random() * 0.08,
    };
  });
}

export default function FloatingElements({ count = 30, className = "" }) {
  const containerRef = useRef(null);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const elemRefs = useRef([]);

  // Generate stable element configs
  const elements = useMemo(() => generateElements(Math.min(count, 40)), [count]);

  // Pointer tracking for subtle parallax
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseOffset.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,  // -1 to 1
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId;
    let lastTime = 0;

    const animate = (time) => {
      // Throttle to ~24fps for performance
      if (time - lastTime < 42) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const mx = mouseOffset.current.x;
      const my = mouseOffset.current.y;

      elemRefs.current.forEach((el, i) => {
        if (!el) return;
        const cfg = elements[i];
        // Parallax: elements move toward cursor slightly
        // Closer elements (larger) move more — depth effect
        const depth = cfg.size / 180; // 0.22–1.0
        const offsetX = mx * 8 * depth;
        const offsetY = my * 6 * depth;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [elements, handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {elements.map((el, i) => (
        <div
          key={el.id}
          ref={(node) => (elemRefs.current[i] = node)}
          className="absolute will-change-transform"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
          }}
        >
          <motion.div
            className={`bg-gradient-to-br ${el.gradient} ${el.darkGradient} ${el.shape} blur-xl`}
            style={{
              width: el.size,
              height: el.size,
              opacity: el.opacity,
            }}
            animate={{
              y: [-el.driftY, el.driftY, -el.driftY],
              x: [-el.driftX, el.driftX, -el.driftX],
              scale: [el.scaleMin, el.scaleMax, el.scaleMin],
            }}
            transition={{
              y: { duration: el.durationY, repeat: Infinity, ease: "easeInOut", delay: el.delayY },
              x: { duration: el.durationX, repeat: Infinity, ease: "easeInOut", delay: el.delayX },
              scale: { duration: el.durationScale, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>
      ))}
    </div>
  );
}
