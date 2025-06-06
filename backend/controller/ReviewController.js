import Review from "../model/ReviewModel.js";
import User from "../model/UserModel.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      // where: { restaurantId: req.params.restaurantId }, // Filter berdasarkan restaurantId
      include: [
        {
          model: User,
          attributes: ["username"], // Ambil hanya username dari tabel User
        },
      ],
    });

    res.json(reviews || []); // Pastikan selalu mengembalikan array
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    // Get userId from authenticated user (set by verifyToken middleware)
    const userId = req.userId;

    console.log("User ID from token:", userId);
    console.log("User data:", req.user);
    console.log("Request body:", req.body);

    if (!userId) {
      console.log("No userId found in request");
      return res.status(401).json({ message: "User authentication required" });
    }

    const { comment, rating, restaurantId, menuId } = req.body;

    // Validate required fields
    if (!comment || !rating || !restaurantId) {
      return res.status(400).json({
        message:
          "Missing required fields: comment, rating, and restaurantId are required",
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const reviewData = {
      userId: userId,
      comment: comment,
      rating: parseInt(rating),
      restaurantId: parseInt(restaurantId),
    };

    // Add menuId if provided
    if (menuId) {
      reviewData.menuId = parseInt(menuId);
    }

    console.log("Creating review with data:", reviewData);

    const newReview = await Review.create(reviewData);

    // Fetch the review with user data for response
    const reviewWithUser = await Review.findByPk(newReview.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log("Review created successfully:", reviewWithUser);
    res.status(201).json(reviewWithUser);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.update(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { restaurantId: req.params.restaurantId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.json(reviews || []);
  } catch (error) {
    console.error("Error fetching reviews by restaurant:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
