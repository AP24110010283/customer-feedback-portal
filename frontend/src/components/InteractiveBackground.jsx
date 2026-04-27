import React, { useEffect, useRef, useCallback } from "react";

/**
 * InteractiveBackground — Lightweight div-based floating particles
 * that subtly react to cursor movement.
 * Max ~50 particles. Uses CSS transforms only (GPU-accelerated).
 */

const PARTICLE_COUNT = 45;

// Pre-generate random particle configs to avoid re-renders
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  opacity: Math.random() * 0.35 + 0.08,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * -20,
  // Color variants: blue, indigo, purple, pink
  color: [
    "rgba(59,130,246,VAR)",   // blue
    "rgba(99,102,241,VAR)",   // indigo
    "rgba(139,92,246,VAR)",   // purple
    "rgba(168,85,247,VAR)",   // purple-500
    "rgba(236,72,153,VAR)",   // pink
  ][Math.floor(Math.random() * 5)],
  driftX: (Math.random() - 0.5) * 60,
  driftY: (Math.random() - 0.5) * 40,
}));

export default function InteractiveBackground({ className = "" }) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const particleRefs = useRef([]);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Animation loop — update particle offsets based on cursor proximity
    let lastTime = 0;
    const animate = (time) => {
      // Throttle to ~30fps for performance
      if (time - lastTime < 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = particles[i];
        // Calculate distance from cursor (normalized 0-1)
        const px = p.x / 100;
        const py = p.y / 100;
        const dx = mx - px;
        const dy = my - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel effect: particles near cursor push away
        const influence = Math.max(0, 1 - dist / 0.3) * 20;
        const offsetX = -dx * influence;
        const offsetY = -dy * influence;

        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => (particleRefs.current[i] = el)}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color.replace("VAR", p.opacity.toString()),
            boxShadow: `0 0 ${p.size * 4}px ${p.color.replace("VAR", (p.opacity * 0.5).toString())}`,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes particleFloat {
          0%, 100% { 
            translate: 0px 0px; 
          }
          25% { 
            translate: ${Math.random() * 20 - 10}px ${Math.random() * 20 - 10}px; 
          }
          50% { 
            translate: ${Math.random() * 30 - 15}px ${Math.random() * 30 - 15}px; 
          }
          75% { 
            translate: ${Math.random() * 20 - 10}px ${Math.random() * 20 - 10}px; 
          }
        }
      `}</style>
    </div>
  );
}
