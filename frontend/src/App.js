import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import "./styles/App.css"; // Adjust the path as necessary

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
