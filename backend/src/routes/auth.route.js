import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/auth.controller.js";
const router = Router();

router.get("/all", getAllUsers);
router.get("/profile/:id", getUserProfile);
router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
