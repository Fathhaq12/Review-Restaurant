import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../styles/RestaurantList.css";
// Import Header component

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/api/restaurants`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Silahkan Login untuk melihat daftar restoran");
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token); // Debug: Pastikan token ada
        const res = await axios.get(`${BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username || "User");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setUsername("User");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="loading">Loading restaurants...</div>;
  if (error) return <div className="error">{error}</div>;
  if (restaurants.length === 0)
    return <div className="no-data">No restaurants found</div>;

  return (
    <>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={restaurant.image || "https://via.placeholder.com/300x200"}
              alt={restaurant.name}
            />
            <div className="card-content">
              <h3>{restaurant.name}</h3>
              <p className="location">{restaurant.location}</p>
              <p className="category">{restaurant.category}</p>
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="cta-button"
                style={{ marginTop: "10px", display: "inline-block" }}
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
