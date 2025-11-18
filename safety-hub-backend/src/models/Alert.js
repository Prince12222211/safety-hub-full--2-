import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  description: String,
  type: { type: String, default: "info", enum: ["info", "warning", "critical", "emergency", "success"] },
  level: String, // Keep for backward compatibility
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);