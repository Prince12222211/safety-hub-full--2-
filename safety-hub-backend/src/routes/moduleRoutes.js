import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllModules,
  getModuleById,
  createModule,
  enrollModule,
  completeModule,
  getMyModules
} from "../controllers/moduleController.js";

const router = express.Router();

router.get("/", getAllModules);
router.get("/my-modules", protect, getMyModules);
router.get("/:id", getModuleById);
router.post("/", protect, createModule);
router.post("/:id/enroll", protect, enrollModule);
router.post("/:id/complete", protect, completeModule);

export default router;
