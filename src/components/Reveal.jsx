import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({ children, delay = 0, className = "", y = 24, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", stagger = 0.09, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 28 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Wipe reveal — a hard-edged panel slides off to unveil content.
   Reads as a "gate opening" — reserved for the one or two moments
   per page that deserve a bigger entrance (hero art, section leads). */
export function WipeReveal({ children, delay = 0, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: delay + 0.05, ease: EASE }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-accent pointer-events-none"
      />
    </div>
  );
}