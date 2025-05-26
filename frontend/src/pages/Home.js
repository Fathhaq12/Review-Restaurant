import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import "../styles/Home.css";
import axios from "axios";
import { BASE_URL } from "../utils";

export default function Home() {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username || "User");
      } catch (err) {
        setUsername("User");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="home">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Food Review</h1>
            <p>Temukan Restoran Terbaik di Kotamu</p>
            <Link to="/restaurants" className="cta-button">
              Lihat Restoran
            </Link>
          </div>
        </section>

        <section className="popular">
          <h2>Restoran Populer</h2>
          <div className="restaurant-grid">
            <RestaurantList />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Food Review. All rights reserved.</p>
      </footer>
    </div>
  );
}
