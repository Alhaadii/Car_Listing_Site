import { Router } from "express";
import {
  createCarList,
  deleteCar,
  getAllCars,
  getCarList,
  getSingleCar,
  UpdateCar,
} from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = new Router();

router.get("/all", getAllCars);
router.post("/create", createCarList);
router.get("/list/:id", verifyToken, getCarList);
router.get("/:id", verifyToken, getSingleCar);
router.delete("/delete/:id", verifyToken, deleteCar);
router.put("/update/:id", verifyToken, UpdateCar);
export default router;
