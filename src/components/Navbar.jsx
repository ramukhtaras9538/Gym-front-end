import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/infrastructure", label: "Infrastructure" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  if (location.pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/84 backdrop-blur-3xl border border-line shadow-[0_20px_60px_rgba(0,0,0,0.12)] glass-panel" : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Always-on scrim so nav text stays legible over bright hero photos, even before scroll */}
      {!scrolled && (
        <div className="absolute inset-0 bg-linear-to-b from-bg/70 via-bg/20 to-transparent pointer-events-none" />
      )}

      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-18 py-4">
        <NavLink to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="w-3 h-3 bg-accent rotate-45 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-display text-xl tracking-wide">
            SPARTANS<span className="text-accent">.</span>GYM
          </span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-bg font-mono text-xs uppercase tracking-widest font-bold px-5 py-2.5 hover:bg-ink hover:text-bg shadow-[0_18px_50px_rgba(245,183,58,0.18)] transition-all"
          >
            Join Now
          </NavLink>

          <NavLink
            to="/admin/login"
            className="inline-flex items-center gap-2 border border-line bg-surface/70 text-ink font-mono text-[10px] uppercase tracking-[0.22em] px-4 py-2.5 hover:border-accent hover:text-accent transition-all"
          >
            Admin Login
          </NavLink>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`w-6 h-0.5 bg-ink transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-ink transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-bg border-t border-line"
          >
            <ul className="flex flex-col px-5 py-4 gap-1 font-mono text-sm uppercase tracking-widest">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 border-b border-line ${isActive ? "text-accent" : "text-muted"}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-line text-muted hover:text-accent"
                >
                  Admin Login
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}