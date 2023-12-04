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

router.get("/", verifyUser, getRestaurants);
router.post("/", verifyUser, addRestaurant);

router.get("/:id", verifyUser, getRestaurant);
router.put("/:id", verifyUser, updateRestaurant);
router.delete("/:id", verifyUser, deleteRestaurant);

router.get("/:id/reviews/:reviewId/likes", getLikes);
router.post("/:id/reviews", verifyUser, addRestaurantReview);
router.post("/:id/reviews/:reviewId/like", verifyUser, likeReview);
router.post("/:id/reviews/:reviewId/dislike", verifyUser, dislikeReview);

export default router;
