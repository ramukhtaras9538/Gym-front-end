import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
  const { token, checking } = useAdminAuth();

  if (checking) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Loading…</span>
      </div>
    );
  }

  if (!token) return <Navigate to="/admin/login" replace />;

  return children;
}