import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ restaurantId }) {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.id);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        `${BASE_URL}/reviews`,
        {
          restaurantId: parseInt(restaurantId),
          rating: parseInt(formData.rating),
          comment: formData.comment,
          userId: userId, // Kirim userId ke backend
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitMessage(
        "Review submitted successfully! Thank you for your feedback."
      );
      setFormData({ rating: 5, comment: "" });
      setIsSubmitting(false);
      window.location.reload();
    } catch (error) {
      setSubmitMessage("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reviews-section">
      <h3>Write a Review</h3>
      {submitMessage && (
        <div
          className="message"
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "10px",
            backgroundColor: submitMessage.includes("successfully")
              ? "#F5E1A4"
              : "#D35400",
            color: submitMessage.includes("successfully") ? "#4E342E" : "white",
            textAlign: "center",
          }}
        >
          {submitMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating *</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #F5E1A4",
              borderRadius: "8px",
              fontSize: "1rem",
              marginTop: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <option value="5">5⭐ - Excellent</option>
            <option value="4">4⭐ - Very Good</option>
            <option value="3">3⭐ - Good</option>
            <option value="2">2⭐ - Fair</option>
            <option value="1">1⭐ - Poor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Your Review *</label>
          <textarea
            id="comment"
            name="comment"
            rows="5"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your experience at this restaurant..."
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #F5E1A4",
              borderRadius: "8px",
              fontSize: "1rem",
              marginTop: "0.5rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#ccc" : "#D35400",
            color: "white",
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "25px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            marginTop: "1rem",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
