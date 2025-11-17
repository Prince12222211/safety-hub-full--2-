import Assessment from "../models/Assessment.js";

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
