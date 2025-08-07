import { Router } from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteUserProfile,
  getUserSeller,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/:sellerId", verifyToken, getUserSeller);
router.put("/update/:id", verifyToken, updateUserProfile);
router.delete("/delete/:id", verifyToken, deleteUserProfile);

export default router;
