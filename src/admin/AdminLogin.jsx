import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin/home");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line bg-surface p-8">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Forge Admin</span>
        <h1 className="font-display text-3xl uppercase mt-2 mb-8">Sign in</h1>

        <label className="block mb-5">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Username</span>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent py-3 outline-none text-ink"
            autoFocus
          />
        </label>

        <label className="block mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent py-3 outline-none text-ink"
          />
        </label>

        {error && <p className="text-accent text-sm font-mono mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-bg font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-ink transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in\u2026" : "Sign in"}
        </button>
      </form>
    </div>
  );
}