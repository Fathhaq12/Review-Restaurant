import express from "express";
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenusByRestaurant,
} from "../controller/MenuController.js";
import { verifyToken } from "../middleware/verifytoken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Public routes (no authentication required) - untuk reviewapp
router.get("/public", getMenus);
router.get("/public/:id", getMenuById);
router.get("/public/restaurant/:restaurantId", getMenusByRestaurant);

// Protected routes (authentication required)
router.get("/", verifyToken, getMenus);
router.get("/:id", verifyToken, getMenuById);
router.get("/restaurant/:restaurantId", verifyToken, getMenusByRestaurant);
router.post("/", verifyToken, isAdmin, createMenu);
router.put("/:id", verifyToken, isAdmin, updateMenu);
router.delete("/:id", verifyToken, isAdmin, deleteMenu);

export default router;
