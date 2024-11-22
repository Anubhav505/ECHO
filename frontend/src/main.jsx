import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import LandingPage from "./Components/home/LandingPage";
import Signup from "./Components/auth/Signup";
import Dashboard from "./Components/dashboard/Dashboard";
import Login from "./Components/auth/Login";
import MeetingPage from "./Components/dashboard/MeetingPage";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate("/login"));
  }, [navigate]);

  return isAuthenticated ? children : null;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/:roomId"
          element={
            <ProtectedRoute>
              <MeetingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>
);
