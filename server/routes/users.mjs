import express from "express";
import { register, login, logout } from "../controllers/userController.mjs";
import verifyUser from "../middleware/verifyUser.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", verifyUser);
router.post("/logout", logout);

export default router;
