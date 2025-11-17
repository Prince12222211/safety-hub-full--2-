import express from "express";
import { createAlert, getAlerts } from "../controllers/alertController.js";
import { protect } from "../middleware/auth.js";
const r = express.Router();
r.post("/", protect, createAlert);
r.get("/", getAlerts);
export default r;