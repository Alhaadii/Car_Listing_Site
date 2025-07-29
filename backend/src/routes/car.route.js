import { Router } from "express";
import { createCarList } from "../controllers/car.controller.js";
const router = new Router();

router.get("/", (req, res) => {
  res.status(200).json({
    Message: "welcome",
  });
});
router.post("/create", createCarList)

export default router;
