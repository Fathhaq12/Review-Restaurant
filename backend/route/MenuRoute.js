import express from "express";
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controller/MenuController.js";
import { verifyToken } from "../middleware/verifytoken.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

router.get("/", verifyToken, getMenus);
router.get("/:id", verifyToken, getMenuById);
router.post("/", verifyToken, isAdmin, createMenu);
router.put("/:id", verifyToken, isAdmin, updateMenu);
router.delete("/:id", verifyToken, isAdmin, deleteMenu);

export default router;
