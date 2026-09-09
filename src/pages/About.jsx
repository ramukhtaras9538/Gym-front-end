import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPage } from "../lib/api";
import Marquee from "../components/Marquee";
import Reveal, { Stagger, StaggerItem, WipeReveal } from "../components/Reveal";
import ParallaxImage from "../components/ParallaxImage";
import ParallaxBanner from "../components/ParallaxBanner";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import PageLoader from "../components/PageLoader";

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPage("about").then(setContent);
  }, []);

  if (!content) return <PageLoader />;

  const { hero, missionTitle, missionBody, missionImage, values, timeline, closingImage } = content;

  return (
    <div>
      <ParallaxBanner src={hero.image} alt={hero.title} height="min-h-[55vh] md:min-h-[72vh]" strength={50}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-end pb-12 md:pb-16">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent uppercase mb-6"
            >
              {hero.eyebrow}
            </motion.p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-3xl drop-shadow-[0_6px_28px_rgba(0,0,0,0.5)]">
              <SplitText text={hero.title} delay={0.1} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-ink/80 text-base md:text-lg leading-relaxed max-w-2xl mt-8"
            >
              {hero.subtitle}
            </motion.p>
          </div>
        </div>
      </ParallaxBanner>

      <Marquee text="EVIDENCE \u2014 CONSISTENCY \u2014 COACHING \u2014 RESULTS" />

      {/* MISSION SPLIT */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <WipeReveal>
          <TiltCard max={4} className="border border-line">
            <ParallaxImage src={missionImage} alt={missionTitle} ratio="aspect-4/5" speed={34} />
          </TiltCard>
        </WipeReveal>
        <Reveal delay={0.1}>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Our mission</span>
          <h2 className="font-display text-3xl md:text-4xl uppercase mt-4 mb-6 leading-tight">
            {missionTitle}
          </h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{missionBody}</p>
        </Reveal>
      </section>

      {/* VALUES */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-14">What we stand on</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <StaggerItem key={v._id}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="border-l-2 border-accent pl-6 py-1"
                >
                  <h3 className="font-display text-xl uppercase mb-2">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-14">A decade on the floor</h2>
        </Reveal>
        <div className="relative border-l border-line ml-2 md:ml-0">
          {timeline.map((t, i) => (
            <Reveal key={t._id} delay={i * 0.08} className="relative pl-8 md:pl-12 pb-14 last:pb-0">
              <motion.span
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                className="absolute -left-1.75 top-1 w-3.5 h-3.5 bg-accent"
              />
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-full sm:w-32 shrink-0 aspect-square overflow-hidden border border-line">
                  <ParallaxImage src={t.img} alt={`Forge Athletic in ${t.year}`} ratio="aspect-square" speed={16} grain={false} />
                </div>
                <div>
                  <span className="font-mono text-accent text-sm tracking-widest">{t.year}</span>
                  <p className="text-lg md:text-xl mt-2 max-w-2xl leading-snug">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOUNDERS BAND */}
      <ParallaxBanner src={closingImage} height="min-h-[55vh]" strength={70}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center py-20">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Ten years in</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase mt-4 leading-tight text-ink">
              <SplitText text="Still the same floor. Still the same standard." />
            </h2>
          </Reveal>
        </div>
      </ParallaxBanner>
    </div>
  );
}