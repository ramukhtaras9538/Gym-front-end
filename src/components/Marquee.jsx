export default function Marquee({ text, reverse = false }) {
  return (
    <div className="relative bg-surface overflow-hidden">
      <div className="hazard-band h-1.5 w-full" />
      <div className="py-4 border-y border-line">
        <div className={`hazard-track ${reverse ? "hazard-track--reverse" : ""}`}>
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-ink px-6 whitespace-nowrap"
            >
              {text}
              <span className="text-accent text-base leading-none">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
      <div className="hazard-band h-1.5 w-full" />
    </div>
  );
}