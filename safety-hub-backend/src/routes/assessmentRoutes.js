import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  submitAssessment,
  getMyAttempts,
  getAssessmentLeaderboard,
  getAssessmentAttemptsById,
  getUserAssessmentAttempts
} from "../controllers/assessmentController.js";

const router = express.Router();

router.get("/", getAllAssessments);
router.get("/my-attempts", protect, getMyAttempts);

// Per-assessment endpoints
router.get("/:id/leaderboard", getAssessmentLeaderboard);
router.get("/:id/attempts", protect, getAssessmentAttemptsById);
router.get("/:id/my", protect, getUserAssessmentAttempts);

router.get("/:id", getAssessmentById);
router.post("/", protect, createAssessment);
router.post("/:id/submit", protect, submitAssessment);

export default router;
