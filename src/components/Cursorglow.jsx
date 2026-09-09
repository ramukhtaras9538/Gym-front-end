import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorGlow
 * A soft red glow that trails the cursor within its parent. Meant for
 * one hero section per page at most — it's ambient atmosphere, not a
 * repeatable pattern. Parent must be `position: relative`.
 */
export default function CursorGlow({ className = "", size = 480 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 110, damping: 24 });
  const sy = useSpring(y, { stiffness: 110, damping: 24 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
        }}
        className="absolute glow-accent"
      />
    </div>
  );
}