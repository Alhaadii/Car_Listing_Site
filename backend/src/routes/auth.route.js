import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  google,
  logoutUser,
} from "../controllers/auth.controller.js";
const router = Router();

router.get("/all", getAllUsers);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/google", google);
router.get("/logout", logoutUser);

export default router;
