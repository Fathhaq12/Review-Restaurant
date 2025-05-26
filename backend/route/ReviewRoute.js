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
import { isUser } from "../middleware/isUser.js";

const router = express.Router();

router.get("/", verifyToken, getReviews);
router.get("/:id", verifyToken, getReviewById);
router.post("/", verifyToken, isUser, createReview);
router.put("/:id", verifyToken, isUser, updateReview);
router.delete("/:id", verifyToken, isUser, deleteReview);
router.get("/restaurant/:restaurantId", verifyToken, getReviewsByRestaurant);

export default router;
