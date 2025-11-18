import express from "express";
import { getLatestNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getLatestNews);

export default router;

