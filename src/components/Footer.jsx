import { NavLink } from "react-router-dom";

const GOOGLE_MAP_URL =
  "https://maps.app.goo.gl/YL7Jsxo7nAf3kZkq6";

const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.739019213618!2d75.92849155767215!3d11.426478900000038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba668ebe69bf961%3A0x7dc6b3a9e057aad5!2sSpartans%20Gym!5e0!3m2!1sen!2sin!4v1788962938600!5m2!1sen!2sin";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 glass-panel soft-glow border border-line">
        
        {/* Brand & Map */}
        <div className="md:col-span-2 space-y-5">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-accent rotate-45" />

            <span className="font-display text-xl tracking-wide">
              FORGE<span className="text-accent">.</span>ATHLETIC
            </span>
          </div>

          {/* Description */}
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            A strength and performance facility for people who train with
            intent. Coimbatore&apos;s ground for building capacity, one honest
            session at a time.
          </p>

          {/* Google Maps */}
          <div className="overflow-hidden border border-line bg-bg/60 rounded-lg">
            <iframe
              title="Spartans Gym Location"
              src={GOOGLE_MAP_EMBED_URL}
              className="block w-full h-52 border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Google Maps Link */}
          <a
            href={GOOGLE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-accent hover:text-ink transition-colors"
          >
            View on Google Maps
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Navigate
          </h3>

          <ul className="space-y-2 text-sm text-muted">
            <li>
              <NavLink
                to="/"
                className="hover:text-ink transition-colors"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className="hover:text-ink transition-colors"
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/infrastructure"
                className="hover:text-ink transition-colors"
              >
                Infrastructure
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className="hover:text-ink transition-colors"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Hours
          </h3>

          <ul className="space-y-2 text-sm text-muted font-mono">
            <li className="flex justify-between gap-4">
              <span>Mon &ndash; Fri</span>
              <span className="text-ink">05:00&ndash;22:00</span>
            </li>

            <li className="flex justify-between gap-4">
              <span>Saturday</span>
              <span className="text-ink">06:00&ndash;20:00</span>
            </li>

            <li className="flex justify-between gap-4">
              <span>Sunday</span>
              <span className="text-ink">07:00&ndash;14:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted font-mono">
          
          <span>
            &copy; {new Date().getFullYear()} FORGE ATHLETIC. ALL RIGHTS RESERVED.
          </span>

          <span>
            BUILT FOR THOSE WHO SHOW UP.
          </span>
        </div>
      </div>
    </footer>
  );
}