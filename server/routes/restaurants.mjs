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
const router = express.Router();

router.get("/", getRestaurants);
router.post("/", addRestaurant);

router.get("/:id", getRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

router.get("/:id/reviews/:reviewId/likes", getLikes);
router.post("/:id/reviews", addRestaurantReview);
router.post("/:id/reviews/:reviewId/like", likeReview);
router.post("/:id/reviews/:reviewId/dislike", dislikeReview);

export default router;
