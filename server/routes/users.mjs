import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", checkAuth);
router.post("/logout", logout);

export default router;
