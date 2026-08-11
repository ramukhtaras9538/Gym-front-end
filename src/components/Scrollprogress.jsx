import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress
 * Thin accent bar pinned to the top of the viewport that fills as the
 * user scrolls the page. Mount this ONCE, at the App/Layout level
 * (outside the route switch), not per-page.
 *
 *   // App.jsx
 *   import ScrollProgress from "./components/ScrollProgress";
 *   export default function App() {
 *     return (
 *       <>
 *         <ScrollProgress />
 *         <Navbar />
 *         <Routes>...</Routes>
 *       </>
 *     );
 *   }
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.75 bg-accent origin-left z-60"
    />
  );
}