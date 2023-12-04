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

router.post("/register", register);
router.post("/login", login);
router.get("/login", isAuthenticated, getUser);
router.post("/logout", verifyUser, logout);

router.get("/:userId/reviews", verifyUser, getUserReviews);
// router.get("/:userId", verifyUser, getUser);

router.post("/friends/request/:userId", verifyUser, sendRequest);
router.post("/friends/accept/:userId", verifyUser, acceptRequest);
router.delete("/friends/remove/:userId", verifyUser, removeFriend);
router.get("/friends/:userId", verifyUser, checkFriendStatus);

export default router;
