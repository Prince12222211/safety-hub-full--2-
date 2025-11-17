import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  description: String,
  questions: [{
    question: String,
    type: { type: String, enum: ['multiple-choice', 'true-false', 'short-answer'], required: true },
    options: [String], // for multiple-choice
    correctAnswer: String,
    points: { type: Number, default: 1 },
    explanation: String
  }],
  passingScore: { type: Number, default: 70 },
  timeLimit: Number, // in minutes
  attempts: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [{ questionIndex: Number, answer: String }],
    score: Number,
    passed: Boolean,
    startedAt: Date,
    completedAt: Date,
    timeTaken: Number // in seconds
  }],
  isActive: { type: Boolean, default: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
}, { timestamps: true });

export default mongoose.model("Assessment", assessmentSchema);
