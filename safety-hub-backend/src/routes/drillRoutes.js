import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllDrills,
  getDrillById,
  createDrill,
  updateDrill,
  getUpcomingDrills,
  completeDrill
} from "../controllers/drillController.js";

const router = express.Router();

router.get("/", getAllDrills);
router.get("/upcoming", getUpcomingDrills);
router.get("/:id", getDrillById);
router.post("/", protect, createDrill);
router.put("/:id", protect, updateDrill);
router.post("/:id/complete", protect, completeDrill);

export default router;
