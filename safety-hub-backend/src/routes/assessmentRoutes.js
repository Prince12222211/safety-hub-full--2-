import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  submitAssessment,
  getMyAttempts
} from "../controllers/assessmentController.js";

const router = express.Router();

router.get("/", getAllAssessments);
router.get("/my-attempts", protect, getMyAttempts);
router.get("/:id", getAssessmentById);
router.post("/", protect, createAssessment);
router.post("/:id/submit", protect, submitAssessment);

export default router;
