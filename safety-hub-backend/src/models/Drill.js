import mongoose from "mongoose";

const drillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['fire', 'earthquake', 'flood', 'evacuation', 'medical', 'lockdown'], required: true },
  description: String,
  facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  scheduledDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  status: { type: String, enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attended: { type: Boolean, default: false },
    performance: { type: String, enum: ['excellent', 'good', 'fair', 'poor'] },
    feedback: String
  }],
  coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  objectives: [String],
  results: {
    attendanceRate: Number,
    averageResponseTime: Number,
    successRate: Number,
    issuesFound: [String],
    recommendations: [String]
  },
  weather: String,
  notes: String,
  completedDate: Date
}, { timestamps: true });

export default mongoose.model("Drill", drillSchema);
