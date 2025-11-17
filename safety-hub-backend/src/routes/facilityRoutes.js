import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility
} from "../controllers/facilityController.js";

const router = express.Router();

router.get("/", getAllFacilities);
router.get("/:id", getFacilityById);
router.post("/", protect, createFacility);
router.put("/:id", protect, updateFacility);
router.delete("/:id", protect, deleteFacility);

export default router;
