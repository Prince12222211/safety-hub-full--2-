import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, default: "incident" },
  priority: { type: String, default: "medium", enum: ["low", "medium", "high", "urgent"] },
  status: { type: String, default: "pending", enum: ["pending", "reviewed", "resolved"] }
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);