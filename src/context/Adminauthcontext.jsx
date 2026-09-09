import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, checkSession } from "../lib/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("forge_admin_token"));
  const [username, setUsername] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    checkSession()
      .then((data) => setUsername(data.username))
      .catch(() => {
        localStorage.removeItem("forge_admin_token");
        setToken(null);
      })
      .finally(() => setChecking(false));
  }, [token]);

  async function login(user, pass) {
    const { token: newToken } = await apiLogin(user, pass);
    localStorage.setItem("forge_admin_token", newToken);
    setToken(newToken);
    setUsername(user);
  }

  function logout() {
    localStorage.removeItem("forge_admin_token");
    setToken(null);
    setUsername(null);
  }

  return (
    <AdminAuthContext.Provider value={{ token, username, checking, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}