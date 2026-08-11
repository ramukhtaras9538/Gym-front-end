import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-accent rotate-45" />
            <span className="font-display text-xl tracking-wide">
              FORGE<span className="text-accent">.</span>ATHLETIC
            </span>
          </div>
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            A strength and performance facility for people who train with intent.
            Coimbatore's ground for building capacity, one honest session at a time.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Navigate</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><NavLink to="/" className="hover:text-ink transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-ink transition-colors">About</NavLink></li>
            <li><NavLink to="/infrastructure" className="hover:text-ink transition-colors">Infrastructure</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-ink transition-colors">Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Hours</h3>
          <ul className="space-y-2 text-sm text-muted font-mono">
            <li className="flex justify-between gap-4"><span>Mon &ndash; Fri</span><span className="text-ink">05:00&ndash;22:00</span></li>
            <li className="flex justify-between gap-4"><span>Saturday</span><span className="text-ink">06:00&ndash;20:00</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-ink">07:00&ndash;14:00</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted font-mono">
          <span>&copy; {new Date().getFullYear()} FORGE ATHLETIC. ALL RIGHTS RESERVED.</span>
          <span>BUILT FOR THOSE WHO SHOW UP.</span>
        </div>
      </div>
    </footer>
  );
}