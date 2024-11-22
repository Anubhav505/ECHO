import React, { useState, useEffect } from "react";
import { Video, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"}>
            <div className="flex items-center">
              <Video className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ECHO
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to={"/signup"}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Sign Up
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;