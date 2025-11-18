import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import drillRoutes from "./routes/drillRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ensureDemoUser } from "./utils/seedDemoUser.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:5173", "http://127.0.0.1:8080", "http://127.0.0.1:8081"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB().then(ensureDemoUser);

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/drills", drillRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => res.send("Safety Hub API is running"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));