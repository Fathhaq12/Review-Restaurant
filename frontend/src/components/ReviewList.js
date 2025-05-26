import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function ReviewList({ restaurantId }) {
  const [reviews, setReviews] = useState([]); // Default: []
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/reviews/restaurant/${restaurantId}`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) {
    return (
      <div
        className="loading"
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#4E342E",
        }}
      >
        Loading reviews...
      </div>
    );
  }

  if (!Array.isArray(reviews)) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#839192",
          fontStyle: "italic",
        }}
      >
        Failed to load reviews.
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#839192",
          fontStyle: "italic",
        }}
      >
        No reviews yet. Be the first to review this restaurant!
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="review-item"
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            marginBottom: "1rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #F5E1A4",
          }}
        >
          <div
            className="review-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <div>
              <div
                className="review-username"
                style={{
                  fontWeight: "bold",
                  color: "#4E342E",
                  fontSize: "1rem",
                  marginBottom: "0.2rem",
                }}
              >
                {r.User?.username || "Anonymous"}
              </div>
              <div
                className="review-rating"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#D35400",
                }}
              >
                {r.rating}⭐
              </div>
            </div>
            {r.date && (
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#839192",
                }}
              >
                {new Date(r.date).toLocaleDateString()}
              </div>
            )}
          </div>
          <div
            className="review-comment"
            style={{
              color: "#4E342E",
              lineHeight: "1.6",
              fontSize: "1rem",
            }}
          >
            {r.comment}
          </div>
        </div>
      ))}
    </div>
  );
}
