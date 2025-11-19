import Assessment from "../models/Assessment.js";
import mongoose from "mongoose";

export const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ isActive: true })
      .populate('module', 'title category')
      .select('-questions.correctAnswer -attempts');
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('module')
      .select('-questions.correctAnswer');
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.create(req.body);
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    const { answers, startedAt, completedAt } = req.body;
    let score = 0;
    const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);

    // Calculate score
    answers.forEach(answer => {
      const question = assessment.questions[answer.questionIndex];
      if (question && question.correctAnswer === answer.answer) {
        score += question.points;
      }
    });

    const percentageScore = (score / totalPoints) * 100;
    const passed = percentageScore >= assessment.passingScore;
    const timeTaken = (new Date(completedAt) - new Date(startedAt)) / 1000; // in seconds

    const attempt = {
      user: req.user.id,
      answers,
      score: percentageScore,
      passed,
      startedAt,
      completedAt,
      timeTaken
    };

    assessment.attempts.push(attempt);
    await assessment.save();

    res.json({
      score: percentageScore,
      passed,
      timeTaken,
      passingScore: assessment.passingScore
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyAttempts = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      'attempts.user': req.user.id
    }).populate('module', 'title');

    const myAttempts = assessments.map(assessment => {
      const userAttempts = assessment.attempts.filter(
        a => a.user.toString() === req.user.id
      );
      return {
        assessment: {
          _id: assessment._id,
          title: assessment.title,
          module: assessment.module
        },
        attempts: userAttempts
      };
    });

    res.json(myAttempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentLeaderboard = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(assessmentId)) {
      return res.status(400).json({ message: "Invalid assessment id" });
    }

    const assessment = await Assessment.findById(assessmentId).populate('attempts.user', 'name email');
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    // Group by user and return top attempts
    const userScores = {};
    (assessment.attempts || []).forEach(a => {
      const uid = a.user?._id?.toString();
      if (!uid) return;
      if (!userScores[uid]) {
        userScores[uid] = { user: a.user, bestScore: a.score, avgScore: a.score, count: 1 };
      } else {
        userScores[uid].bestScore = Math.max(userScores[uid].bestScore, a.score);
        userScores[uid].avgScore = (userScores[uid].avgScore * userScores[uid].count + a.score) / (userScores[uid].count + 1);
        userScores[uid].count++;
      }
    });

    const leaderboard = Object.values(userScores)
      .sort((a, b) => b.bestScore - a.bestScore || b.avgScore - a.avgScore)
      .slice(0, 10)
      .map(({ user, bestScore, avgScore }) => ({ user, bestScore, avgScore }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentAttemptsById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id).populate('attempts.user', 'name email');
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    // Sort attempts by score descending
    const attempts = (assessment.attempts || []).slice().sort((a, b) => b.score - a.score);
    res.json({ assessment: { _id: assessment._id, title: assessment.title }, attempts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserAssessmentAttempts = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const assessment = await Assessment.findById(assessmentId).populate('module', 'title');
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    const userAttempts = (assessment.attempts || []).filter(a => a.user.toString() === req.user.id);
    res.json({ assessment: { _id: assessment._id, title: assessment.title, module: assessment.module }, attempts: userAttempts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
