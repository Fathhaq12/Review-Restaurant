import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  // Menu state
  const [menuForm, setMenuForm] = useState({
    name: "",
    price: "",
    description: "",
    restaurantId: "",
  });
  const [editMenuId, setEditMenuId] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      // Optional: handle error
    }
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRestaurants();
    fetchMenus();
    // eslint-disable-next-line
  }, []);

  // Fetch restoran
  const fetchRestaurants = async () => {
    const res = await axios.get(`${BASE_URL}/restaurants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRestaurants(res.data);
  };

  // Fetch menu
  const fetchMenus = async () => {
    const res = await axios.get(`${BASE_URL}/menus`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMenus(res.data);
  };

  // CRUD Restoran
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("category", form.category);
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(`${BASE_URL}/restaurants/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(`${BASE_URL}/restaurants`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
    setForm({ name: "", location: "", category: "" });
    setImage(null);
    setEditId(null);
    fetchRestaurants();
  };

  const handleEdit = (resto) => {
    setForm({
      name: resto.name,
      location: resto.location,
      category: resto.category,
    });
    setEditId(resto.id);
    setImage(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/restaurants/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRestaurants();
  };

  // CRUD Menu
  const handleMenuChange = (e) =>
    setMenuForm({ ...menuForm, [e.target.name]: e.target.value });

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (editMenuId) {
      await axios.put(`${BASE_URL}/menus/${editMenuId}`, menuForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${BASE_URL}/menus`, menuForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setMenuForm({
      name: "",
      price: "",
      description: "",
      restaurantId: "",
    });
    setEditMenuId(null);
    fetchMenus();
  };

  const handleMenuEdit = (menu) => {
    setMenuForm({
      name: menu.name,
      price: menu.price,
      description: menu.description,
      restaurantId: menu.restaurantId,
    });
    setEditMenuId(menu.id);
  };

  const handleMenuDelete = async (id) => {
    await axios.delete(`${BASE_URL}/menus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMenus();
  };

  return (
    <div className="admin-container">
      {/* Enhanced Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <span className="store-icon">🏪</span>
            </div>
            <h1 className="header-title">Restaurant Admin</h1>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card restaurant-stat">
            <div className="stat-content">
              <div className="stat-icon-container restaurant-icon-bg">
                <span className="stat-icon">🏪</span>
              </div>
              <div className="stat-info">
                <h3 className="stat-label">Total Restaurants</h3>
                <p className="stat-number restaurant-number">
                  {restaurants.length}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card menu-stat">
            <div className="stat-content">
              <div className="stat-icon-container menu-icon-bg">
                <span className="stat-icon">📋</span>
              </div>
              <div className="stat-info">
                <h3 className="stat-label">Total Menu Items</h3>
                <p className="stat-number menu-number">{menus.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Management Section */}
        <div className="management-section">
          <div className="section-header restaurant-header">
            <h2 className="section-title">
              <span className="section-icon">🏪</span>
              Restaurant Management
            </h2>
          </div>

          {/* Restaurant Form */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Restaurant Name *</label>
                  <input
                    name="name"
                    placeholder="Enter restaurant name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Location *</label>
                  <input
                    name="location"
                    placeholder="Enter location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Category *</label>
                  <input
                    name="category"
                    placeholder="Enter category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {editId && (
                <div className="current-image-info">
                  <span className="current-image-label">Current image:</span>
                  {restaurants.find((r) => r.id === editId)?.image ? (
                    <img
                      src={restaurants.image}
                      alt="Current restaurant"
                      className="current-image"
                    />
                  ) : (
                    <span className="no-image-text">No image</span>
                  )}
                </div>
              )}

              <div className="form-field">
                <label className="form-label">Restaurant Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="file-label">
                    <span className="upload-icon">📤</span>
                    <span>Choose Image</span>
                  </label>
                  {image && (
                    <span className="file-selected">
                      Image selected: {image.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn restaurant-btn">
                  <span className="btn-icon">➕</span>
                  <span>{editId ? "Update Restaurant" : "Add Restaurant"}</span>
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({ name: "", location: "", category: "" });
                      setImage(null);
                    }}
                    className="cancel-btn"
                  >
                    <span className="btn-icon">❌</span>
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Restaurant Table */}
          <div className="table-container">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Image</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Location</th>
                  <th className="table-th">Category</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {restaurants.map((r) => (
                  <tr key={r.id} className="table-row">
                    <td className="table-td">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="table-image"
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          <span className="no-image-text-small">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="table-td">
                      <div className="table-name">{r.name}</div>
                    </td>
                    <td className="table-td">
                      <div className="table-location">{r.location}</div>
                    </td>
                    <td className="table-td">
                      <span className="category-badge restaurant-badge">
                        {r.category}
                      </span>
                    </td>
                    <td className="table-td">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(r)}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Menu Management Section */}
        <div className="management-section">
          <div className="section-header menu-header">
            <h2 className="section-title">
              <span className="section-icon">📋</span>
              Menu Management
            </h2>
          </div>

          {/* Menu Form */}
          <div className="form-container">
            <form onSubmit={handleMenuSubmit} className="form">
              <div className="menu-form-grid">
                <div className="form-field">
                  <label className="form-label">Menu Name *</label>
                  <input
                    name="name"
                    placeholder="Enter menu name"
                    value={menuForm.name}
                    onChange={handleMenuChange}
                    required
                    className="form-input menu-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Price *</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    value={menuForm.price}
                    onChange={handleMenuChange}
                    required
                    className="form-input menu-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Description *</label>
                  <input
                    name="description"
                    placeholder="Enter description"
                    value={menuForm.description}
                    onChange={handleMenuChange}
                    required
                    className="form-input menu-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Restaurant *</label>
                  <select
                    name="restaurantId"
                    value={menuForm.restaurantId}
                    onChange={handleMenuChange}
                    required
                    className="form-select menu-input"
                  >
                    <option value="">Select Restaurant</option>
                    {restaurants.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn menu-btn">
                  <span className="btn-icon">➕</span>
                  <span>{editMenuId ? "Update Menu" : "Add Menu"}</span>
                </button>
                {editMenuId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditMenuId(null);
                      setMenuForm({
                        name: "",
                        price: "",
                        description: "",
                        restaurantId: "",
                      });
                    }}
                    className="cancel-btn"
                  >
                    <span className="btn-icon">❌</span>
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menu Table */}
          <div className="table-container">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Menu Name</th>
                  <th className="table-th">Price</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Restaurant</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {menus.map((m) => (
                  <tr key={m.id} className="table-row">
                    <td className="table-td">
                      <div className="table-name">{m.name}</div>
                    </td>
                    <td className="table-td">
                      <div className="table-price">
                        Rp {parseInt(m.price).toLocaleString()}
                      </div>
                    </td>
                    <td className="table-td">
                      <div className="table-description">{m.description}</div>
                    </td>
                    <td className="table-td">
                      <span className="category-badge menu-badge">
                        {restaurants.find((r) => r.id === m.restaurantId)
                          ?.name || "-"}
                      </span>
                    </td>
                    <td className="table-td">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleMenuEdit(m)}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleMenuDelete(m.id)}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
