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
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
