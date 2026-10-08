import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Sign from "./pages/Sign.jsx";
import Signup from "./pages/Signup.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar user={user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<Sign setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/appointments" element={<AppointmentsPage />} />

          {/* Role Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/signin" />}
          />
          <Route
            path="/staff/dashboard"
            element={user?.role === "staff" ? <StaffDashboard /> : <Navigate to="/signin" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}