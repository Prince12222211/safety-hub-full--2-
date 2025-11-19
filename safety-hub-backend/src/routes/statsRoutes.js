import express from "express";
import {
  getAssessmentStats,
  getAlertStats,
  getReportStats,
  getDrillStats,
  getDashboardOverview
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/assessments", getAssessmentStats);
router.get("/alerts", getAlertStats);
router.get("/reports", getReportStats);
router.get("/drills", getDrillStats);
router.get("/overview", getDashboardOverview);

export default router;
