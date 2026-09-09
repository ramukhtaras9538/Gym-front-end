import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPage, submitInquiry } from "../lib/api";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import ParallaxImage from "../components/ParallaxImage";
import ParallaxBanner from "../components/ParallaxBanner";
import MagneticButton from "../components/MagneticButton";
import SplitText from "../components/SplitText";
import PageLoader from "../components/PageLoader";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "email", label: "Email", type: "email" },
];

export default function Contact() {
  const [content, setContent] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", program: "Strength", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getPage("contact").then(setContent);
  }, []);

  if (!content) return <PageLoader />;

  const { hero, contactInfo, hours, whyChooseUs = [] } = content;

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await submitInquiry(form);
      setSent(true);
    } catch (error) {
      alert(error.message || "Unable to send your inquiry. Please try again later.");
    }
  }

  return (
    <div>
      <ParallaxBanner src={hero.image} alt={hero.title} height="min-h-[55vh]" strength={70}>
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

      <Marquee text="WALK-INS WELCOME \u2014 FREE FIRST SESSION \u2014 NO CONTRACT TOURS" />

      <section className="bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-12">Why choose us</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item._id || `${item.title}-${index}`} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="h-full border border-line bg-bg p-7"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">0{index + 1}</span>
                  <h3 className="font-display text-2xl uppercase mt-5 mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-5 gap-14">
        {/* FORM */}
        <Reveal className="lg:col-span-3">
          <h2 className="font-display text-3xl uppercase mb-8">Book a session</h2>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-accent bg-surface p-8"
            >
              <p className="font-display text-2xl uppercase text-accent mb-2">Request received.</p>
              <p className="text-muted">A coach will call you within one business day to confirm your slot.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {FIELDS.map((f) => (
                  <label key={f.name} className="block">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">{f.label}</span>
                    <input
                      required
                      type={f.type}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      className="mt-2 w-full bg-transparent border-b border-line focus:border-accent py-3 outline-none transition-colors placeholder:text-muted/50"
                      placeholder={f.label}
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">Program interest</span>
                  <select
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    className="mt-2 w-full bg-transparent border-b border-line focus:border-accent py-3 outline-none transition-colors"
                  >
                    <option>Strength</option>
                    <option>Conditioning</option>
                    <option>Mobility &amp; Recovery</option>
                    <option>Boxing</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full bg-transparent border-b border-line focus:border-accent py-3 outline-none transition-colors resize-none placeholder:text-muted/50"
                  placeholder="Tell us about your training background or goals"
                />
              </label>

              <MagneticButton strength={0.25}>
                <button
                  type="submit"
                  className="bg-accent text-bg font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-ink transition-colors"
                >
                  Send request
                </button>
              </MagneticButton>
            </form>
          )}
        </Reveal>

        {/* INFO PANEL */}
        <Reveal delay={0.1} className="lg:col-span-2 space-y-8">
          <div className="bg-surface border border-line overflow-hidden">
            <div className="p-8 pb-0">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Location</h3>
              <p className="text-lg leading-relaxed whitespace-pre-line">{contactInfo.address}</p>
            </div>
            <ParallaxImage
              src={contactInfo.mapImage}
              alt="Street view near Forge Athletic"
              ratio="aspect-video"
              speed={18}
              className="mt-6"
              grain={false}
            />
          </div>

          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-surface border border-line p-8"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Reach us</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted">Phone &nbsp;</span>{contactInfo.phone}</li>
              <li><span className="text-muted">Email &nbsp;</span>{contactInfo.email}</li>
              {contactInfo.website && (
                <li>
                  <span className="text-muted">Website &nbsp;</span>
                  <a href={contactInfo.website} target="_blank" rel="noreferrer" className="text-ink hover:text-accent transition-colors break-all">
                    {contactInfo.website}
                  </a>
                </li>
              )}
            </ul>
          </motion.div>

          <div className="bg-surface border border-line p-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Hours</h3>
            <ul className="divide-y divide-line">
              {hours.map((h) => (
                <li key={h._id} className="flex justify-between py-3 text-sm">
                  <span className="text-muted">{h.day}</span>
                  <span className="font-mono">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}