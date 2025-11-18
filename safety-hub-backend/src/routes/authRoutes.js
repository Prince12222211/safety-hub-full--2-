import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const r = express.Router();

r.post("/register", register);
r.post("/login", login);
r.get("/profile", protect, getProfile);

export default r;