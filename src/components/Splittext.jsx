import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * SplitText
 * Masks each word (or character) in its own overflow-hidden box and
 * slides it up into place, staggered. Use on headlines that deserve
 * a bigger entrance than a plain fade — not on body copy.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  by = "word",
  stagger = 0.045,
  once = true,
}) {
  const pieces = by === "char" ? text.split("") : text.split(" ");

  return (
    <span className={className}>
      {pieces.map((piece, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE, delay: delay + i * stagger }}
            className="inline-block"
          >
            {piece === " " ? "\u00A0" : piece}
            {by === "word" && i < pieces.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}