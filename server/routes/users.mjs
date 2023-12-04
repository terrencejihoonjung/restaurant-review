import express from "express";
import {
  register,
  login,
  logout,
  isAuthenticated,
  getUserReviews,
  getUser,
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
router.get("/login", isAuthenticated, getUser); // Login and Obtain User Data
router.post("/logout", verifyUser, logout); // Logout
router.get("/:userId", verifyUser, getUser); // Not Sure

// User Reviews
router.get("/:userId/reviews", verifyUser, getUserReviews); // Get User Reviews

// User Friends
router.post("/friends/request/:userId", verifyUser, sendRequest); // Send Request
router.post("/friends/accept/:userId", verifyUser, acceptRequest); // Accept Request
router.delete("/friends/remove/:userId", verifyUser, removeFriend); // Remove Friend
router.get("/friends/:userId", verifyUser, checkFriendStatus); // Check Friendship

export default router;
