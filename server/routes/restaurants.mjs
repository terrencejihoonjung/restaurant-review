import express from "express";
import {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addRestaurantReview,
} from "../controllers/restaurantController.mjs";
import verifyUser from "../middleware/verifyUser.mjs";
const router = express.Router();

router.get("/", verifyUser, getRestaurants);
router.post("/", verifyUser, addRestaurant);

router.get("/:id", verifyUser, getRestaurant);
router.put("/:id", verifyUser, updateRestaurant);
router.delete("/:id", verifyUser, deleteRestaurant);

router.post("/:id/reviews", verifyUser, addRestaurantReview);

export default router;
