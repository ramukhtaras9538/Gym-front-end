import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getPage } from "../lib/api";
import Marquee from "../components/Marquee";
import Counter from "../components/Counter";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal";
import ParallaxImage from "../components/ParallaxImage";
import ParallaxBanner from "../components/ParallaxBanner";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import CursorGlow from "../components/CursorGlow";
import PageLoader from "../components/PageLoader";

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPage("home").then(setContent);
  }, []);

  if (!content) return <PageLoader />;

  const { hero, marquee, secondaryMarquee, aboutSection, stats = [], features = [], programs = [], ctaImage } = content;
  const heroTitle = hero?.title?.trim() || "WE THE SPARTANS";
  const heroSubtitle = hero?.subtitle?.trim() || "Spartans gym, near thamarassery, Calicut";
  const heroEyebrow = hero?.eyebrow?.trim() || "FITNESS";
  const aboutCard = aboutSection || {};
  const marqueeText = marquee || "NO EXCUSES — SHOW UP — TRACK PROGRESS — REPEAT";
  const secondaryMarqueeText = secondaryMarquee || "STRENGTH — CONDITIONING — MOBILITY — RECOVERY";

  return (
    <div>
      {/* HERO — full-bleed parallax photo, split-text headline, cursor glow */}
      <ParallaxBanner src={hero.image} alt={heroTitle} height="min-h-[92vh]" strength={90}>
        <CursorGlow className="hidden md:block" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col justify-end pb-16 pt-40 md:pt-52">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent uppercase mb-6"
          >
            {heroEyebrow}
          </motion.p>

          <h1 className="font-display leading-[0.82] uppercase text-[16vw] sm:text-7xl md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <SplitText text={heroTitle} delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="max-w-xl mt-8 text-ink/80 text-base md:text-lg leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4 animate-floating"
          >
            <MagneticButton className="animate-pulse-slow">
              <NavLink
                to="/contact"
                className="block bg-accent text-bg font-mono text-xs uppercase tracking-widest font-bold px-7 py-4 hover:bg-ink hover:text-bg transition-colors shadow-[0_20px_60px_rgba(245,183,58,0.16)]"
              >
                Book a free session
              </NavLink>
            </MagneticButton>
            <MagneticButton className="animate-pulse-slow">
              <NavLink
                to="/infrastructure"
                className="block border border-ink/40 text-ink font-mono text-xs uppercase tracking-widest font-bold px-7 py-4 hover:border-accent hover:text-accent transition-colors backdrop-blur-sm"
              >
                See the facility
              </NavLink>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="w-px h-8 bg-ink/40" />
        </motion.div>
      </ParallaxBanner>

      <Marquee text={marqueeText} />

      {/* STAT READOUT */}
      <section className="bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s._id} delay={i * 0.08}>
              <div className="text-3xl md:text-4xl font-bold stat-mono text-ink">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-muted text-xs md:text-sm uppercase tracking-widest mt-2 font-mono">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <TiltCard max={6} className="border border-line overflow-hidden">
              <ParallaxImage src={aboutCard.image} alt={aboutCard.title || "About us"} ratio="aspect-4/5" speed={18} />
            </TiltCard>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{aboutCard.eyebrow || "About us"}</p>
            <h2 className="font-display text-4xl md:text-5xl uppercase mt-5 mb-6 leading-tight">
              {aboutCard.title || "Built different from the franchise gym"}
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed whitespace-pre-line">
              {aboutCard.body || "Forge Athletic is built for serious training. We pair premium equipment with expert coaching, thoughtful programming, and a community that values consistency over hype."}
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee text={secondaryMarqueeText} reverse />

      {/* PROGRAMS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <h2 className="font-display text-4xl md:text-5xl uppercase">Programs</h2>
            <NavLink to="/infrastructure" className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
              View full infrastructure &rarr;
            </NavLink>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <StaggerItem key={p._id}>
              <TiltCard max={5} className="relative aspect-4/5 overflow-hidden border border-line group">
                <ParallaxImage src={p.img} alt={p.name} ratio="aspect-4/5" speed={30} className="absolute inset-0" />
                <div className="absolute inset-0 photo-vignette" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="font-mono text-4xl text-accent">{p.code}</span>
                  <h3 className="font-display text-2xl uppercase mt-3 mb-2 text-ink">{p.name}</h3>
                  <p className="text-ink/75 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl uppercase max-w-2xl leading-tight">
            <SplitText text="Built different from" />
            <br />
            <SplitText text="the franchise gym" delay={0.15} className="text-accent" />
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {features.map((f, i) => (
            <StaggerItem key={f._id}>
              <TiltCard className="bg-surface border border-line h-full">
                <ParallaxImage src={f.img} alt={f.title} ratio="aspect-4/5" speed={26} eyebrow={`0${i + 1}`} />
                <div className="p-8">
                  <h3 className="font-display text-xl uppercase mb-3">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.body}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <ParallaxBanner src={ctaImage} height="min-h-[60vh]" strength={70} overlayOpacity={0.85}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-center text-center py-20">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-tight text-ink">
              First session is <span className="text-accent">on us.</span>
            </h2>
            <p className="font-mono text-sm mt-4 max-w-md mx-auto text-ink/75">
              Walk in, meet a coach, and see if Forge is the right floor for you.
            </p>
            <MagneticButton className="mt-8">
              <NavLink
                to="/contact"
                className="block bg-accent text-bg font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-ink transition-colors"
              >
                Claim your session
              </NavLink>
            </MagneticButton>
          </Reveal>
        </div>
      </ParallaxBanner>
    </div>
  );
}