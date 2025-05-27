import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function MenuList({ restaurantId }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    API.get("/menus").then((res) => {
      setMenus(res.data.filter((m) => m.restaurantId === Number(restaurantId)));
    });
  }, [restaurantId]);

  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {menus.map((m) => (
          <li key={m.id}>
            {m.name} - Rp{m.price} - {m.description}
            <span className="restaurant-icon">🍽️</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
