import express from "express";
import {
  loginUser,
  verifyUser,
  myProfile,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
// Route to handle user login
router.post("/login", loginUser);
// Route to handle user verification
router.post("/verify", verifyUser);
// Route to get user profile (protected route)
router.get("/me", isAuth, myProfile);
export default router;
