import express from "express";
import { suggestIncident } from "../controllers/aiController.js";

const router = express.Router();

router.post("/incident-suggest", suggestIncident);

export default router;

