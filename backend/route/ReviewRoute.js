import express from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByRestaurant,
} from "../controller/ReviewController.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// Public routes (with authentication)
router.get("/", verifyToken, getReviews);
router.get("/:id", verifyToken, getReviewById);
router.get("/restaurant/:restaurantId", verifyToken, getReviewsByRestaurant);

// User routes - remove isUser middleware since verifyToken is sufficient
router.post("/", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
