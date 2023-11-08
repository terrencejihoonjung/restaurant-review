import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  getUserReviews,
  getUser,
} from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", checkAuth);
router.post("/logout", logout);

router.get("/:userId/reviews", getUserReviews);
router.get("/:userId", getUser);

export default router;
