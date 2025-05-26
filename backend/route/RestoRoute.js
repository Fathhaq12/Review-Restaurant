import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controller/RestoController.js";
import { verifyToken } from "../middleware/verifytoken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/", verifyToken, getRestaurants);
router.get("/:id", verifyToken, getRestaurantById);
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createRestaurant
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateRestaurant
);
router.delete("/:id", verifyToken, isAdmin, deleteRestaurant);

export default router;
