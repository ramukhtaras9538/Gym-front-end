import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard
 * Subtle 3D tilt that tracks the cursor across the card — makes photo
 * cards feel like physical objects on the floor rather than flat tiles.
 * Wrap a card's outer element; keep `max` small (6–10deg) so it reads
 * as tactile, not like a game menu.
 */
export default function TiltCard({ children, className = "", max = 7, scale = 1.015 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 22 });
  const s = useSpring(1, { stiffness: 220, damping: 22 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    s.set(scale);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
    s.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale: s, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}