import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPage } from "../lib/api";
import Marquee from "../components/Marquee";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal";
import ParallaxImage from "../components/ParallaxImage";
import ParallaxBanner from "../components/ParallaxBanner";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import PageLoader from "../components/PageLoader";

export default function Infrastructure() {
  const [content, setContent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPage("infrastructure").then(setContent);
  }, []);

  if (!content) return <PageLoader />;

  const { hero, facilities = [], galleryGroups = [], trainers = [] } = content;

  return (
    <div>
      <ParallaxBanner src={hero.image} alt={hero.title} height="min-h-[75vh]" strength={80}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col justify-end pb-16 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent uppercase mb-6"
          >
            {hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-3xl text-ink">
            <SplitText text={hero.title} delay={0.1} />
          </h1>
        </div>
      </ParallaxBanner>

      <Marquee text="COMPETITION PLATFORMS \u2014 CALIBRATED PLATES \u2014 SERVICED MONTHLY" />

      {/* FACILITIES */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-14">The floor plan</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <StaggerItem key={f._id}>
              <TiltCard max={5} className="relative overflow-hidden border border-line group h-full">
                <ParallaxImage src={f.img} alt={f.name} ratio="aspect-4/3" speed={22} />
                <div className="p-8 bg-bg">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-accent text-sm">{f.code}</span>
                    <span className="font-mono text-xs text-muted text-right">
                      {f.sqft}<br />sqft
                    </span>
                  </div>
                  <h3 className="font-display text-xl uppercase mb-3">{f.name}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.detail}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Gallery</span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mt-2">Facility highlights</h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-10">
          {galleryGroups.map((group) => {
            const images = (group.images || []).filter(Boolean).slice(0, 5);

            return (
              <div key={group._id || group.title} className="border border-line bg-surface p-5 md:p-7">
                <div className="mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">Group</p>
                  <h3 className="font-display text-3xl md:text-4xl uppercase mt-2">{group.title}</h3>
                  {group.subtitle && <p className="text-muted mt-2 text-sm md:text-base">{group.subtitle}</p>}
                </div>

                <div className="gallery-animated-grid">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${group.title}-${index}`}
                      className={`gallery-animated-item gallery-animated-item--${index + 1}`}
                      style={{ animationDelay: `${index * 0.12}s` }}
                      onClick={() => setSelectedImage({ src: image, title: group.title, index: index + 1 })}
                    >
                      <div className="gallery-image-shell">
                        <img
                          src={image}
                          alt={`${group.title} ${index + 1}`}
                          className="gallery-image"
                        />
                        <div className="gallery-image-overlay" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="gallery-lightbox" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="gallery-lightbox-close"
              aria-label="Close image"
            >
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="gallery-lightbox-image" />
            <div className="gallery-lightbox-meta">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{selectedImage.title}</span>
              <span className="font-display text-xl uppercase">Photo {selectedImage.index}</span>
            </div>
          </div>
        </div>
      )}

      <Marquee text="MEET THE COACHING STAFF \u2014 EYES ON EVERY REP" reverse />

      {/* TRAINERS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Our staff</span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mt-2">Gym trainers</h2>
            </div>
            <p className="text-muted text-sm max-w-sm">
              Certified coaches cover the floor across every session &mdash; here are a few
              you'll train with.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t) => (
            <StaggerItem key={t._id}>
              <TiltCard max={5} className="group bg-surface border border-line overflow-hidden">
                <ParallaxImage src={t.img} alt={t.name} ratio="aspect-4/3" speed={20} caption={t.cert} />
                <div className="p-6 relative">
                  <span className="absolute top-0 left-6 -translate-y-1/2 h-0.5 w-10 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <h3 className="font-display text-lg uppercase">{t.name}</h3>
                  <p className="text-accent text-xs font-mono uppercase tracking-widest mt-1">{t.role}</p>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{t.spec}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}