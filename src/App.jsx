import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Infrastructure from "./pages/Infrastructure";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminHome from "./admin/AdminHome";
import AdminAbout from "./admin/AdminAbout";
import AdminInfrastructure from "./admin/AdminInfrastructure";
import AdminContact from "./admin/AdminContact";

function PublicLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/infrastructure" element={<PublicLayout><Infrastructure /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="infrastructure" element={<AdminInfrastructure />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}