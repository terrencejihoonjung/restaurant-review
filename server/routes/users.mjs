import express from "express";
import {
  register,
  login,
  logout,
  getUserReviews,
  getUser,
  getProfileUser,
  sendRequest,
  acceptRequest,
  removeFriend,
  checkFriendStatus,
} from "../controllers/userController.mjs";
import verifyUser from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Register/Login/Logout
router.post("/register", register); // Register
router.post("/login", login); // Login
router.get("/login", verifyUser, getUser); // Get User Data
router.post("/logout", verifyUser, logout); // Logout
router.get("/:userId", verifyUser, getProfileUser); // Get Profile User Data

// User Reviews
router.get("/:userId/reviews", verifyUser, getUserReviews); // Get User Reviews

// User Friends
router.post("/friends/request/:userId", verifyUser, sendRequest); // Send Request
router.post("/friends/accept/:userId", verifyUser, acceptRequest); // Accept Request
router.delete("/friends/remove/:userId", verifyUser, removeFriend); // Remove Friend
router.get("/friends/:userId", verifyUser, checkFriendStatus); // Check Friendship

export default router;
