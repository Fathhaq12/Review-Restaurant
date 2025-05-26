import React, { useEffect, useState } from "react";
import API from "../api/api";
import MenuList from "./MenuList";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";
import "../styles/RestaurantDetail.css";
import Header from "./Header"; // Import Header

export default function RestaurantDetail() {
  const { id } = useParams();
  const [resto, setResto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/restaurants/${id}`)
      .then((res) => setResto(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="loading">Loading restaurant details...</div>
        </div>
      </>
    );
  }

  if (!resto) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="error">Restaurant not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="restaurant-detail">
          <div className="restaurant-header">
            {resto.image && (
              <div className="restaurant-image">
                <img
                  src={`${process.env.PUBLIC_URL}${resto.image}`}
                  alt={resto.name}
                />
              </div>
            )}
            <h2>{resto.name}</h2>
            <p className="restaurant-info">
              <span className="location-icon">📍</span> {resto.location}
              <span className="separator">•</span>
              <span className="category-icon">🏷️</span> {resto.category}
            </p>
            {resto.description && (
              <p className="restaurant-description">{resto.description}</p>
            )}
          </div>
        </div>

        <MenuList restaurantId={id} />

        <div className="reviews-section">
          <h3>Restaurant Reviews</h3>
          <ReviewList restaurantId={id} />
        </div>

        <ReviewForm restaurantId={id} />
      </div>
    </>
  );
}
