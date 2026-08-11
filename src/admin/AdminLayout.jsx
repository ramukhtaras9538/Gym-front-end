import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const NAV = [
  { to: "/admin/home", label: "Home" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/infrastructure", label: "Infrastructure" },
  { to: "/admin/contact", label: "Contact" },
];

export default function AdminLayout() {
  const { username, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row">
      <aside className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-line bg-surface p-6 md:min-h-screen">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Forge Admin</span>
        <h1 className="font-display text-2xl uppercase mt-2 mb-8">Content</h1>

        <nav className="flex md:flex-col gap-2 flex-wrap">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-widest px-3 py-2 border transition-colors ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:text-ink hover:border-line"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-line">
          <p className="font-mono text-[11px] text-muted mb-3">Signed in as {username}</p>
          <button
            onClick={logout}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}