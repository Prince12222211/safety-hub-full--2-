import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, XCircle, BookOpen, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const earthquakeQuizzes: QuizQuestion[] = [
  {
    id: 1,
    question: "What should you do immediately when you feel an earthquake?",
    options: [
      "Run outside the building",
      "Drop, Cover, and Hold On (take cover under a sturdy desk or table)",
      "Get in the bathtub",
      "Stand in the doorway"
    ],
    correctAnswer: 1,
    explanation: "The 'Drop, Cover, and Hold On' technique protects you from falling debris. Avoid running outside as falling objects are more dangerous outdoors."
  },
  {
    id: 2,
    question: "How long should you remain in a 'Drop, Cover, Hold On' position?",
    options: [
      "10 seconds",
      "Until you stop feeling shaking (usually 30-60 seconds)",
      "5 minutes",
      "As soon as possible"
    ],
    correctAnswer: 1,
    explanation: "Most earthquakes last 5-30 seconds, but strong shaking may continue for longer. Stay protected until all shaking has completely stopped."
  },
  {
    id: 3,
    question: "What is the 'safe triangle' concept in earthquake safety?",
    options: [
      "A triangular shelter built outside homes",
      "The triangular void that forms next to a dropped object when a building collapses",
      "A warning symbol for earthquakes",
      "A triangle marking on emergency exits"
    ],
    correctAnswer: 1,
    explanation: "The safe triangle concept suggests seeking shelter next to large, sturdy objects that won't collapse completely, as these create protective spaces."
  },
  {
    id: 4,
    question: "What should you NOT do during an earthquake?",
    options: [
      "Use the elevator",
      "Run outside the building",
      "Turn off gas if you smell it after the earthquake",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All three are things you should NOT do. Elevators can trap you, running outside exposes you to falling debris, and only turn off gas if you smell it."
  },
  {
    id: 5,
    question: "What is the primary purpose of an earthquake Early Warning System?",
    options: [
      "To predict earthquakes days in advance",
      "To detect earthquakes and send alerts in the first few seconds",
      "To stop earthquakes from happening",
      "To measure earthquake severity"
    ],
    correctAnswer: 1,
    explanation: "Early Warning Systems detect earthquakes that are already happening and send alerts within seconds, giving people time to take protective action."
  },
  {
    id: 6,
    question: "After an earthquake, when should you leave your building?",
    options: [
      "Immediately after shaking stops",
      "After checking for injuries, gas leaks, and structural damage",
      "Only if ordered to evacuate",
      "After calling emergency services"
    ],
    correctAnswer: 1,
    explanation: "Check for injuries and hazards first, ensure the building is safe, and only leave if necessary. Move carefully to avoid injured persons and debris."
  },
  {
    id: 7,
    question: "What should be included in an earthquake emergency kit?",
    options: [
      "Only flashlight and water",
      "First aid kit, water, flashlight, batteries, food, medications, whistle, and documents",
      "Just a map",
      "Nothing - it's not necessary"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive emergency kit should include water (1 gallon/person/day), food, first aid, medications, important documents, flashlight, batteries, whistle, and sturdy shoes."
  },
  {
    id: 8,
    question: "On a scale of Richter scale, what magnitude earthquake is generally considered major?",
    options: [
      "Below 3.0",
      "3.0 - 4.9",
      "5.0 - 5.9",
      "7.0 and above"
    ],
    correctAnswer: 3,
    explanation: "Earthquakes of magnitude 7.0 or higher are considered major or great earthquakes. Magnitude 6.0-6.9 are strong, 5.0-5.9 are moderate."
  },
  {
    id: 9,
    question: "What should you do if trapped under rubble after an earthquake?",
    options: [
      "Shout continuously",
      "Try to move large debris",
      "Stay calm, tap on pipes/walls to signal, and preserve breathing space",
      "Panic to attract attention"
    ],
    correctAnswer: 2,
    explanation: "If trapped, stay calm, ration your energy, tap on pipes/walls in patterns, create and maintain breathing space, and only shout when you hear rescuers."
  },
  {
    id: 10,
    question: "Which area is typically the safest during an earthquake at home?",
    options: [
      "Window areas",
      "Under a sturdy table, against interior walls, or in corners",
      "Near the front door",
      "On the roof"
    ],
    correctAnswer: 1,
    explanation: "Interior walls, under sturdy furniture, and corners provide the most protection from falling debris and structural collapse. Avoid windows and exterior walls."
  }
];

interface QuizProps {
  onComplete?: (score: number, totalQuestions: number, answers: number[]) => void;
  assessmentId?: string;
}

export const EarthquakeQuiz = ({ onComplete, assessmentId }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [submittingAttempt, setSubmittingAttempt] = useState(false);

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < earthquakeQuizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      const completedAt = new Date().toISOString();
      calculateScore(newAnswers, completedAt);
    }
  };

  const calculateScore = (finalAnswers: number[], completedAt?: string) => {
    const score = finalAnswers.filter((answer, index) => {
      return answer === earthquakeQuizzes[index].correctAnswer;
    }).length;

    if (onComplete) {
      onComplete(score, earthquakeQuizzes.length, finalAnswers);
    }

    // If an assessmentId was provided, submit the attempt to backend
    if (assessmentId) {
      submitAttemptToApi(finalAnswers, completedAt || new Date().toISOString());
    }
  };

  const submitAttemptToApi = async (finalAnswers: number[], completedAt: string) => {
    try {
      setSubmittingAttempt(true);
      // Lazy import to avoid circular issues
      const { submitAssessment } = await import("../services/assessmentService");

      const payload = {
        answers: finalAnswers.map((ansIdx, qi) => ({ questionIndex: qi, answer: earthquakeQuizzes[qi].options[ansIdx] })),
        startedAt: startedAt || new Date().toISOString(),
        completedAt
      };

      await submitAssessment(assessmentId as string, payload);
    } catch (err) {
      console.error("Failed to submit attempt:", err);
    } finally {
      setSubmittingAttempt(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    // mark start time when component mounts
    setStartedAt(new Date().toISOString());
  }, []);

  if (showResults) {
    const score = answers.filter((answer, index) => {
      return answer === earthquakeQuizzes[index].correctAnswer;
    }).length;
    const percentage = Math.round((score / earthquakeQuizzes.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Earthquake Awareness Quiz - Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-3 mb-4">
                {passed ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <h3 className={`text-2xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                    {passed ? '🎉 Excellent!' : '📚 Keep Learning!'}
                  </h3>
                  <p className={`text-sm ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {passed ? 'You passed the assessment!' : 'You need 70% to pass. Try again!'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-white rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="text-3xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-600 font-medium">Correct</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 transition-transform hover:scale-105">
                  <div className="text-3xl font-bold text-red-600">{earthquakeQuizzes.length - score}</div>
                  <div className="text-sm text-gray-600 font-medium">Incorrect</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 transition-transform hover:scale-105">
                  <div className={`text-3xl font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Score</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-gray-900">Review Your Answers:</h4>
              {earthquakeQuizzes.map((quiz, index) => {
                const isCorrect = answers[index] === quiz.correctAnswer;
                return (
                  <div 
                    key={quiz.id} 
                    className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                      isCorrect 
                        ? 'border-l-green-600 bg-green-50 hover:shadow-md' 
                        : 'border-l-red-600 bg-red-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{index + 1}. {quiz.question}</p>
                        <p className={`text-sm mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: <span className="font-semibold">{quiz.options[answers[index]]}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mt-1">
                            Correct answer: <span className="font-semibold">{quiz.options[quiz.correctAnswer]}</span>
                          </p>
                        )}
                        <p className="text-xs text-gray-600 mt-2 bg-white bg-opacity-60 rounded p-2 leading-relaxed">
                          <span className="font-semibold">Explanation:</span> {quiz.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button onClick={handleRestart} className="w-full bg-orange-600 hover:bg-orange-700">
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const quiz = earthquakeQuizzes[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / earthquakeQuizzes.length) * 100);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Earthquake Awareness Quiz
            </CardTitle>
            <CardDescription className="text-orange-100">
              Learn how to prepare and respond to earthquakes
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentQuestion + 1}/{earthquakeQuizzes.length}</div>
            <div className="text-xs text-orange-100">{progress}% Complete</div>
          </div>
        </div>
        <div className="w-full bg-orange-900 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Alert className="mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 font-medium">
            Choose the best answer for each question. You need 70% to pass.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{quiz.question}</h3>
            
            <RadioGroup value={selectedAnswer?.toString() || ""} onValueChange={(value) => handleSelectAnswer(parseInt(value))}>
              <div className="space-y-3">
                {quiz.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedAnswer === index
                        ? 'border-orange-600 bg-orange-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50 hover:shadow-md'
                    }`}
                  >
                    <RadioGroupItem 
                      value={index.toString()}
                      id={`option-${index}`}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer font-normal text-gray-700 leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 leading-relaxed">
              <span className="font-bold">💡 Tip:</span> Think about the safest location during earthquake shaking and proper protective actions.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => {
                setCurrentQuestion(Math.max(0, currentQuestion - 1));
                setSelectedAnswer(answers[currentQuestion - 1] ?? null);
              }}
              variant="outline"
              disabled={currentQuestion === 0}
              className="flex-1 hover:bg-gray-100 transition-colors"
            >
              ← Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all duration-200 disabled:opacity-50"
            >
              {currentQuestion === earthquakeQuizzes.length - 1 ? '✓ Finish' : 'Next →'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthquakeQuiz;
