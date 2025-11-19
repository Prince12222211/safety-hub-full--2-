import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, Clock, CheckCircle2, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAssessments, createAssessment, getAssessmentLeaderboard, getAssessmentAttempts, getUserAttemptsForAssessment } from "../services/assessmentService";
import { getModules as fetchModules } from "../services/moduleService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EarthquakeQuiz } from "@/components/EarthquakeQuiz";

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [showEarthquakeQuiz, setShowEarthquakeQuiz] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    module: "",
    passingScore: 70,
    timeLimit: "",
    difficulty: "beginner",
    questions: [{ question: "", type: "multiple-choice", options: ["", "", "", ""], correctAnswer: "", points: 1 }]
  });
  const [submitting, setSubmitting] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [attemptsOpen, setAttemptsOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [myAttempts, setMyAttempts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assessmentsData, modulesData] = await Promise.all([
        getAssessments(),
        fetchModules()
      ]);
      setAssessments(assessmentsData || []);
      setModules(modulesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setAssessments([]);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "", type: "multiple-choice", options: ["", "", "", ""], correctAnswer: "", points: 1 }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formData.questions.length === 0 || formData.questions.some(q => !q.question)) {
      toast({ title: "Error", description: "Please add at least one question", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await createAssessment({
        ...formData,
        module: formData.module,
        timeLimit: formData.timeLimit ? parseInt(formData.timeLimit) : undefined,
        isActive: true
      });
      toast({ title: "Success", description: "Assessment created successfully" });
      setFormData({
        title: "",
        description: "",
        module: "",
        passingScore: 70,
        timeLimit: "",
        difficulty: "beginner",
        questions: [{ question: "", type: "multiple-choice", options: ["", "", "", ""], correctAnswer: "", points: 1 }]
      });
      setCreateDialogOpen(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create assessment",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEarthquakeQuizComplete = (score: number, total: number, answers: number[]) => {
    const percentage = Math.round((score / total) * 100);
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${total} (${percentage}%). ${percentage >= 70 ? 'Great job!' : 'Keep practicing!'}`
    });
  };

  const openLeaderboard = async (assessment) => {
    try {
      setSelectedAssessment(assessment);
      setLeaderboardOpen(true);
      const data = await getAssessmentLeaderboard(assessment._id || assessment.id);
      setLeaderboard(data || []);
    } catch (err) {
      console.error('Failed loading leaderboard', err);
    }
  };

  const openAttempts = async (assessment) => {
    try {
      setSelectedAssessment(assessment);
      setAttemptsOpen(true);
      const [allAttempts, userAttempts] = await Promise.all([
        getAssessmentAttempts(assessment._id || assessment.id),
        getUserAttemptsForAssessment(assessment._id || assessment.id)
      ]);
      setAttempts(allAttempts.attempts || allAttempts || []);
      setMyAttempts(userAttempts.attempts || userAttempts || []);
    } catch (err) {
      console.error('Failed loading attempts', err);
    }
  };

  const totalQuestions = assessments.reduce((sum, a) => sum + (a.questions?.length || 0), 0);
  const totalCompletions = assessments.reduce((sum, a) => sum + (a.attempts?.length || 0), 0);
  const avgPass = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => sum + (a.passingScore || 70), 0) / assessments.length)
    : 70;

  return (
    <DashboardLayout
      title={{
        en: "Assessments",
        hi: "मूल्यांकन",
        pa: "ਮੁਲਾਂਕਣ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "Knowledge Assessments",
            hi: "ज्ञान मूल्यांकन",
            pa: "ਗਿਆਨ ਮੁਲਾਂਕਣ",
          }}
          description={{
            en: "Create, assign, and monitor digital quizzes to measure retention and readiness.",
            hi: "रिटेंशन और तत्परता को मापने के लिए डिजिटल क्विज़ बनाएं, सौंपें और मॉनिटर करें।",
            pa: "ਧਿਆਨ ਅਤੇ ਤਿਆਰੀ ਨੂੰ ਮਾਪਣ ਲਈ ਡਿਜ਼ਿਟਲ ਕੁਇਜ਼ਾਂ ਬਣਾਓ, ਸੌਂਪੋ ਅਤੇ ਮਾਨੀਟਰ ਕਰੋ।",
          }}
          badge={{
            en: "Assessment studio",
            hi: "मूल्यांकन स्टूडियो",
            pa: "ਮੁਲਾਂਕਣ ਸਟੂਡਿਓ",
          }}
          icon={<ClipboardList className="h-6 w-6" />}
          actions={
            <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              <TranslatedText en="Create Assessment" hi="मूल्यांकन बनाएं" pa="ਮੁਲਾਂਕਣ ਬਣਾਓ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Active quizzes", hi: "सक्रिय क्विज़", pa: "ਸਕਰੀਆ ਕੁਇਜ਼" },
              value: (assessments.length + 1).toString(),
              helper: `${totalQuestions + 10} questions total`,
            },
            {
              label: { en: "Avg. passing score", hi: "औसत उत्तीर्ण स्कोर", pa: "ਔਸਤ ਪਾਸਿੰਗ ਸਕੋਰ" },
              value: `${avgPass}%`,
              helper: "Adaptive thresholds",
            },
            {
              label: { en: "Completions", hi: "पूर्णता", pa: "ਸੰਪੂਰਨਤਾ" },
              value: totalCompletions.toString(),
              helper: "Rolling 90 days",
            },
          ]}
        />

        {/* Earthquake Awareness Quiz Section */}
        {showEarthquakeQuiz ? (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setShowEarthquakeQuiz(false)}
              className="mb-4"
            >
              ← Back to Assessments
            </Button>
            <EarthquakeQuiz onComplete={handleEarthquakeQuizComplete} assessmentId={selectedAssessment?._id} />
          </div>
        ) : (
          <>
            {/* Featured Earthquake Quiz Card */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-orange-600 rounded-lg">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs font-semibold rounded-full">FEATURED</span>
                    </div>
                    <CardTitle className="text-2xl">Earthquake Awareness Quiz</CardTitle>
                    <CardDescription className="mt-2 text-gray-700">
                      Test your knowledge about earthquake safety, preparedness, and response procedures. Learn essential skills to protect yourself and others.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">10</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">70%</div>
                    <div className="text-sm text-gray-600">Pass Required</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">~5 min</div>
                    <div className="text-sm text-gray-600">Time to Complete</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => {
                      const eq = assessments.find(a => a.title === 'Earthquake Awareness Quiz');
                      setSelectedAssessment(eq || null);
                      setShowEarthquakeQuiz(true);
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <LoadingSpinner text="Loading assessments..." />
            ) : assessments.length === 0 ? (
              <Card className="glass-panel border-white/60">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Assessments Available</h3>
                  <p className="text-sm text-muted-foreground">Create your first assessment to get started</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessments.map((assessment) => (
                  <Card key={assessment._id || assessment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <CardDescription className="mt-1">{assessment.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ClipboardList className="h-4 w-4" />
                          <span>{assessment.questions?.length || 0} questions</span>
                        </div>
                        {assessment.timeLimit && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{assessment.timeLimit} min</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{assessment.passingScore || 70}% pass</span>
                        </div>
                        <div className="text-muted-foreground">
                          {assessment.attempts?.length || 0} taken
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => openLeaderboard(assessment)}>
                          <TranslatedText en="Leaderboard" hi="लीडरबोर्ड" pa="ਲੀਡਰਬੋਰਡ" />
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => openAttempts(assessment)}>
                          <TranslatedText en="Attempts" hi="प्रयास" pa="ਕੋਸ਼ਿਸ਼ਾਂ" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Assessment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>Create a quiz with multiple questions</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assessment Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="module">Module</Label>
                <Select
                  value={formData.module}
                  onValueChange={(value) => setFormData({ ...formData, module: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module._id} value={module._id}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingScore">Passing Score (%)</Label>
                <Input
                  id="passingScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.passingScore}
                  onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label>Questions</Label>
                <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
              {formData.questions.map((q, qIndex) => (
                <div key={qIndex} className="border rounded-lg p-4 space-y-3">
                  <div className="space-y-2">
                    <Label>Question {qIndex + 1} *</Label>
                    <Input
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                      placeholder="Enter question"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={q.type}
                      onValueChange={(value) => updateQuestion(qIndex, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {q.type === "multiple-choice" && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {q.options.map((opt, oIndex) => (
                        <Input
                          key={oIndex}
                          value={opt}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      ))}
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Select
                          value={q.correctAnswer}
                          onValueChange={(value) => updateQuestion(qIndex, "correctAnswer", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            {q.options.map((opt, oIndex) => (
                              <SelectItem key={oIndex} value={opt || `Option ${oIndex + 1}`}>
                                {opt || `Option ${oIndex + 1}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {(q.type === "true-false" || q.type === "short-answer") && (
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <Input
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(qIndex, "correctAnswer", e.target.value)}
                        placeholder="Enter correct answer"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Assessment"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
        {/* Leaderboard Dialog */}
        <Dialog open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Leaderboard — {selectedAssessment?.title}</DialogTitle>
              <DialogDescription>Top performers for this assessment</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              {leaderboard.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attempts yet.</p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded shadow-sm">
                      <div>
                        <div className="font-medium">{row.user?.name || row.user?.email || 'User'}</div>
                        <div className="text-xs text-muted-foreground">{row.user?.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{Math.round(row.bestScore)}%</div>
                        <div className="text-xs text-muted-foreground">avg {Math.round(row.avgScore)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Attempts Dialog */}
        <Dialog open={attemptsOpen} onOpenChange={setAttemptsOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Attempts — {selectedAssessment?.title}</DialogTitle>
              <DialogDescription>All attempts (top) and your attempts (below)</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <section>
                <h4 className="font-semibold mb-2">Top Attempts</h4>
                {attempts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No attempts recorded yet.</p>
                ) : (
                  attempts.map((a, i) => (
                    <div key={i} className="p-3 bg-white rounded border mb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{a.user?.name || a.user?.email || 'Anonymous'}</div>
                          <div className="text-xs text-muted-foreground">{new Date(a.completedAt).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{Math.round(a.score)}%</div>
                          <div className="text-xs text-muted-foreground">{a.passed ? 'Passed' : 'Failed'}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </section>

              <section>
                <h4 className="font-semibold mb-2">Your Attempts</h4>
                {myAttempts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">You have not attempted this assessment yet.</p>
                ) : (
                  myAttempts.map((a, i) => (
                    <div key={i} className="p-3 bg-white rounded border mb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">{new Date(a.completedAt).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{Math.round(a.score)}%</div>
                          <div className="text-xs text-muted-foreground">{a.passed ? 'Passed' : 'Failed'}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </section>
            </div>
          </DialogContent>
        </Dialog>
    </DashboardLayout>
  );
};

// Leaderboard Dialog
export default Assessments;
