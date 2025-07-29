import { Router } from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({
    status: true,
    message: "User route is working",
    user: req.user,
  });
});

router.put("/update/:id", verifyToken, updateUserProfile);
router.delete("/delete/:id", verifyToken, deleteUserProfile);

export default router;
