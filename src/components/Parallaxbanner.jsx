import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxBanner
 * Full-bleed background photo that scrolls slower than the page,
 * duotoned red/black, with a vignette so headline type stays legible.
 * Wrap your section content as children — it's positioned above the photo.
 */
export default function ParallaxBanner({
  src,
  alt = "",
  children,
  className = "",
  height = "min-h-[70vh]",
  strength = 120,
  overlayOpacity = 0.9,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${height} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.25 }}
        className="absolute inset-0 w-full h-full object-cover img-duotone"
        loading="lazy"
      />
      <div
        className="absolute inset-0 photo-vignette pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}