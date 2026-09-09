import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticButton
 * Wrap any button/link — it drifts toward the cursor within its own
 * bounds and springs back on mouse-leave. Keep this for primary CTAs
 * only; on everything it reads as gimmicky rather than tactile.
 */
export default function MagneticButton({ children, className = "", strength = 0.4 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * strength, y: relY * strength });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}