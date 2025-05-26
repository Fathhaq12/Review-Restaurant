import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <button onClick={() => navigate("/")}>Ke Home</button>
      <button onClick={() => navigate("/login")} style={{ marginLeft: 8 }}>
        Login
      </button>
      <button onClick={() => navigate("/register")} style={{ marginLeft: 8 }}>
        Register
      </button>
    </div>
  );
}
