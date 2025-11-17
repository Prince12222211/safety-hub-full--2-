import express from "express";
import { createReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";
const r = express.Router();
r.post("/", protect, createReport);
r.get("/", getReports);
export default r;