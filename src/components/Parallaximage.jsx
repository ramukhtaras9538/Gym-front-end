import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * ParallaxImage
 * A photo block that drifts against scroll and ships in the site's
 * signature red/black duotone. On hover (or on tap for touch, via
 * the .group class from the parent) the color bleeds back in and
 * the image zooms in slightly wider.
 *
 * Swap `src` for real photography — everything here is built to work
 * with any landscape/portrait photo, no cropping required beyond
 * object-cover.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  ratio = "aspect-4/5",
  speed = 40,
  duotone = true,
  grain = true,
  eyebrow,
  caption,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  const baseScale = 1.18;
  const hoverScale = useSpring(baseScale, { stiffness: 220, damping: 24 });
  const hasValidImage = typeof src === "string" && src.trim() !== "";

  function handleMouseEnter() {
    hoverScale.set(baseScale * 1.12);
  }

  function handleMouseLeave() {
    hoverScale.set(baseScale);
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${ratio} ${className}`}
    >
      {hasValidImage ? (
        <motion.img
          src={src}
          alt={alt || "Decorative image"}
          style={{ y, scale: hoverScale }}
          className={`absolute inset-0 w-full h-full object-cover ${duotone ? "img-duotone" : ""}`}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-accent/70" />
      )}
      {duotone && <div className="absolute inset-0 duotone-overlay pointer-events-none" />}
      {grain && <div className="absolute inset-0 grain-overlay pointer-events-none" />}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />

      {eyebrow && (
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80 bg-bg/60 backdrop-blur-sm px-2 py-1">
          {eyebrow}
        </span>
      )}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 photo-vignette">
          <p className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-ink/90 font-semibold">{caption}</p>
        </div>
      )}
    </div>
  );
}