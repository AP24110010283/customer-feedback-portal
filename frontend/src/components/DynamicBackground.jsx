import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * DynamicBackground — Premium full-screen animated visual layer.
 *
 * Layers (back to front):
 *  1. Slowly shifting gradient (CSS animation)
 *  2. 4 large blurred blobs with cursor parallax + slow drift
 *  3. Soft grid overlay at very low opacity
 *  4. 3 floating glassmorphism "ghost" UI cards
 *
 * Performance rules:
 *  - Transform-only animations (GPU composited)
 *  - will-change: transform on moving elements
 *  - Parallax throttled to ~24 fps via rAF
 *  - Max 4 blobs, 3 ghost cards
 *  - pointer-events: none on entire layer
 */

/* ── Blob configurations (generated once) ── */
const BLOBS = [
  {
    id: 0,
    // Top-left
    position: { left: "5%", top: "8%" },
    size: 340,
    color: "bg-blue-400/[0.12] dark:bg-blue-500/[0.08]",
    drift: { y: 30, x: 20 },
    duration: { y: 22, x: 28 },
    delay: 0,
    depth: 1.0,
  },
  {
    id: 1,
    // Center-right
    position: { right: "8%", top: "30%" },
    size: 300,
    color: "bg-purple-400/[0.10] dark:bg-purple-500/[0.07]",
    drift: { y: 25, x: 18 },
    duration: { y: 26, x: 32 },
    delay: -5,
    depth: 0.7,
  },
  {
    id: 2,
    // Bottom-left
    position: { left: "15%", bottom: "10%" },
    size: 280,
    color: "bg-pink-400/[0.09] dark:bg-pink-500/[0.06]",
    drift: { y: 22, x: 25 },
    duration: { y: 30, x: 24 },
    delay: -10,
    depth: 0.85,
  },
  {
    id: 3,
    // Top-center
    position: { left: "50%", top: "5%" },
    size: 260,
    color: "bg-indigo-400/[0.08] dark:bg-indigo-500/[0.05]",
    drift: { y: 20, x: 15 },
    duration: { y: 35, x: 28 },
    delay: -15,
    depth: 0.55,
  },
];

/* ── Ghost card configurations ── */
const GHOST_CARDS = [
  {
    id: "gc-0",
    position: { top: "12%", right: "-3%" },
    width: "w-72",
    rotate: 6,
    rotateRange: [6, 3, 6],
    driftY: [-10, 10, -10],
    duration: 16,
    delay: 0,
    opacity: 0.07,
    lines: [
      { w: "w-2/3", h: "h-3", opacity: "bg-gray-400/30" },
      { w: "w-full", h: "h-2", opacity: "bg-gray-400/20" },
      { w: "w-4/5", h: "h-2", opacity: "bg-gray-400/15" },
    ],
  },
  {
    id: "gc-1",
    position: { bottom: "15%", left: "-4%" },
    width: "w-64",
    rotate: -4,
    rotateRange: [-4, -2, -4],
    driftY: [8, -8, 8],
    duration: 20,
    delay: 4,
    opacity: 0.06,
    lines: [
      { w: "w-1/2", h: "h-3", opacity: "bg-gray-400/30" },
      { w: "w-full", h: "h-2", opacity: "bg-gray-400/20" },
      { w: "w-3/5", h: "h-2", opacity: "bg-gray-400/15" },
    ],
  },
  {
    id: "gc-2",
    position: { top: "55%", right: "5%" },
    width: "w-52",
    rotate: 9,
    rotateRange: [9, 6, 9],
    driftY: [-6, 6, -6],
    duration: 24,
    delay: 8,
    opacity: 0.05,
    lines: [
      { w: "w-3/4", h: "h-2", opacity: "bg-gray-400/25" },
      { w: "w-1/2", h: "h-2", opacity: "bg-gray-400/15" },
    ],
  },
];

export default function DynamicBackground({ className = "" }) {
  const containerRef = useRef(null);
  const blobRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  /* ── Cursor tracking (passive, no state updates) ── */
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized: -1 to 1
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  /* ── Parallax animation loop (rAF, throttled ~24fps) ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen on window so cursor is tracked even outside the container
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId;
    let lastTime = 0;
    // Smoothed mouse for lerp
    const smooth = { x: 0, y: 0 };

    const tick = (time) => {
      if (time - lastTime < 42) {
        // ~24fps throttle
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      // Lerp for buttery smoothness
      smooth.x += (mousePos.current.x - smooth.x) * 0.08;
      smooth.y += (mousePos.current.y - smooth.y) * 0.08;

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const blob = BLOBS[i];
        // Max 20px movement, scaled by depth
        const offsetX = smooth.x * 20 * blob.depth;
        const offsetY = smooth.y * 15 * blob.depth;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ═══════════ Layer 1: Animated Gradient ═══════════ */}
      <div
        className="absolute inset-0 dynamic-bg-gradient"
        style={{ zIndex: 0 }}
      />

      {/* ═══════════ Layer 2: Large Blurred Blobs ═══════════ */}
      {BLOBS.map((blob, i) => (
        <div
          key={blob.id}
          ref={(node) => (blobRefs.current[i] = node)}
          className="absolute will-change-transform"
          style={{
            ...blob.position,
            zIndex: 1,
          }}
        >
          <motion.div
            className={`rounded-full ${blob.color} blur-3xl`}
            style={{
              width: blob.size,
              height: blob.size,
            }}
            animate={{
              y: [-blob.drift.y, blob.drift.y, -blob.drift.y],
              x: [-blob.drift.x, blob.drift.x, -blob.drift.x],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              y: {
                duration: blob.duration.y,
                repeat: Infinity,
                ease: "easeInOut",
                delay: blob.delay,
              },
              x: {
                duration: blob.duration.x,
                repeat: Infinity,
                ease: "easeInOut",
                delay: blob.delay,
              },
              scale: {
                duration: blob.duration.y + 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </div>
      ))}

      {/* ═══════════ Layer 3: Soft Grid Overlay ═══════════ */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══════════ Layer 4: Floating Ghost UI Cards ═══════════ */}
      {GHOST_CARDS.map((card) => (
        <motion.div
          key={card.id}
          className={`absolute ${card.width} backdrop-blur-md bg-white/[0.06] dark:bg-white/[0.03] border border-white/10 dark:border-white/5 rounded-2xl p-5 pointer-events-none`}
          style={{
            ...card.position,
            opacity: card.opacity,
            rotate: card.rotate,
            zIndex: 3,
          }}
          animate={{
            y: card.driftY,
            rotate: card.rotateRange,
          }}
          transition={{
            y: {
              duration: card.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
            rotate: {
              duration: card.duration + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
        >
          {card.lines.map((line, li) => (
            <div
              key={li}
              className={`${line.h} ${line.w} ${line.opacity} rounded ${
                li < card.lines.length - 1 ? "mb-2" : ""
              }`}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
