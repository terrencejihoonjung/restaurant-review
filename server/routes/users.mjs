import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  getUserReviews,
  getUser,
  sendRequest,
  acceptRequest,
  removeFriend,
  checkFriendStatus,
} from "../controllers/userController.mjs";
import verifyUser from "../middleware/verifyUser.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", checkAuth);
router.post("/logout", logout);

router.get("/:userId/reviews", getUserReviews);
router.get("/:userId", getUser);

router.post("/friends/request/:userId", sendRequest);
router.post("/friends/accept/:userId", acceptRequest);
router.delete("/friends/remove/:userId", removeFriend);
router.get("/friends/:userId", checkFriendStatus);

export default router;
