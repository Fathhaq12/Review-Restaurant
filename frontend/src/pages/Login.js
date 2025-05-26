import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import { jwtDecode } from "jwt-decode";
import "../styles/Auth.css";
import Header from "../components/Header";
import API from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await API.post("/api/auth/login", {
        username,
        password,
      });
      console.log("Token received:", response.data.accessToken); // Debug: Pastikan token diterima
      localStorage.setItem("accessToken", response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log("Decoded token:", decoded); // Debug: Pastikan token ter-decode dengan benar
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Welcome Back</h2>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-dots">Logging in</span>
            ) : (
              <span>Login</span>
            )}
          </button>
          <div className="auth-link">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
