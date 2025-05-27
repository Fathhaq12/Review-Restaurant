import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import axios from "axios";
import { BASE_URL } from "../utils";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Cek token di localStorage saat komponen mount
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">FoodReview</Link>
      </div>
      <nav>
        <Link to="/restaurants">Restaurants</Link>
        {isLoggedIn ? (
          <button className="book-trip" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="book-trip">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
