import React, { useState } from "react";
import API from "../api/api";

export default function AuthForm({ type, onAuth }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (type === "login") {
        res = await API.post("/auth/login", {
          username: form.username,
          password: form.password,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
      } else {
        await API.post("/auth/register", form);
      }
      onAuth && onAuth();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === "login" ? "Login" : "Register"}</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      {type === "register" && (
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
      )}
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />
      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
