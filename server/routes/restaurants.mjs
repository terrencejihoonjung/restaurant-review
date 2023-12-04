import express from "express";
import {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addRestaurantReview,
  getLikes,
  likeReview,
  dislikeReview,
} from "../controllers/restaurantController.mjs";
import verifyUser from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", verifyUser, getRestaurants); // Get restaurants
router.get("/:id", verifyUser, getRestaurant); // Get restaurant

router.post("/", verifyUser, addRestaurant); // Add restaurant
router.put("/:id", verifyUser, updateRestaurant); // Update restaurant
router.delete("/:id", verifyUser, deleteRestaurant); // Delete restaurant

router.get("/:id/reviews/:reviewId/likes", getLikes); // Get reviews' likes

router.post("/:id/reviews", verifyUser, addRestaurantReview); // Add review
router.post("/:id/reviews/:reviewId/like", verifyUser, likeReview); // Like review
router.post("/:id/reviews/:reviewId/dislike", verifyUser, dislikeReview); // Dislike review

export default router;
