import express from "express";
import {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addRestaurantReview,
} from "../controllers/restaurantController.mjs";
const router = express.Router();

router.get("/", getRestaurants);
router.post("/", addRestaurant);

router.get("/:id", getRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

router.post("/:id/reviews", addRestaurantReview);

export default router;
