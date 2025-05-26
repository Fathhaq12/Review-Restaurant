import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
  getProfile,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// Auth routes
router.post("/register", register); // Register user
router.post("/login", login); // Login user
router.post("/logout", verifyToken, logout); // Logout user

// User CRUD (hanya untuk admin)
router.get("/me", verifyToken, getProfile); // Endpoint untuk fetch profile
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Profile route

export default router;
