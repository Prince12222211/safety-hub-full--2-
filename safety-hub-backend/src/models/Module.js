import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['earthquake', 'fire', 'flood', 'cyclone', 'medical'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration: { type: Number, required: true }, // in minutes
  content: [{
    type: { type: String, enum: ['video', 'text', 'quiz', 'interactive'] },
    title: String,
    data: String,
    duration: Number
  }],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  completedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true },
  thumbnail: String,
  tags: [String],
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }]
}, { timestamps: true });

export default mongoose.model("Module", moduleSchema);
