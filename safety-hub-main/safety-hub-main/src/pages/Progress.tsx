import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Target, Award, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { getModules } from "../services/moduleService";
import { getAssessments } from "../services/assessmentService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

const Progress = () => {
  const [modules, setModules] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [modulesData, assessmentsData] = await Promise.all([
        getModules(),
        getAssessments()
      ]);
      setModules(modulesData || []);
      setAssessments(assessmentsData || []);
    } catch (error) {
      console.error("Error loading progress data:", error);
      setModules([]);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  const exportProgress = () => {
    try {
      const progressData = {
        modules: modules.map(m => ({
          title: m.title,
          category: m.category,
          enrolled: m.enrolledUsers?.length || 0,
          completed: m.completedUsers?.length || 0,
          completionRate: m.enrolledUsers?.length > 0 
            ? Math.round((m.completedUsers?.length || 0) / m.enrolledUsers.length * 100)
            : 0
        })),
        assessments: assessments.map(a => ({
          title: a.title,
          attempts: a.attempts?.length || 0,
          passingScore: a.passingScore || 70
        })),
        summary: {
          totalModules: modules.length,
          totalEnrolled: modules.reduce((sum, m) => sum + (m.enrolledUsers?.length || 0), 0),
          totalCompleted: modules.reduce((sum, m) => sum + (m.completedUsers?.length || 0), 0),
          totalAssessments: assessments.length,
          totalAttempts: assessments.reduce((sum, a) => sum + (a.attempts?.length || 0), 0)
        },
        exportedAt: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safety-hub-progress-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Progress data exported successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export progress data",
        variant: "destructive"
      });
    }
  };

  const totalCompletions = modules.reduce((sum, m) => sum + (m.completedUsers?.length || 0), 0);
  const totalEnrolled = modules.reduce((sum, m) => sum + (m.enrolledUsers?.length || 0), 0);
  const avgTime = modules.length > 0 ? Math.round(modules.reduce((sum, m) => sum + (m.duration || 0), 0) / modules.length) : 0;
  const successRate = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => {
        const passed = a.attempts?.filter(att => att.passed).length || 0;
        const total = a.attempts?.length || 1;
        return sum + (passed / total * 100);
      }, 0) / assessments.length)
    : 0;

  return (
    <DashboardLayout
      title={{
        en: "Progress Tracking",
        hi: "प्रगति ट्रैकिंग",
        pa: "ਤਰੱਕੀ ਟਰੈਕਿੰਗ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "Learning Progress",
            hi: "सीखने की प्रगति",
            pa: "ਸਿੱਖਣ ਦੀ ਤਰੱਕੀ",
          }}
          description={{
            en: "Track individual and organization-wide training progress with glass dashboard insights.",
            hi: "ग्लास डैशबोर्ड इनसाइट्स के साथ व्यक्तिगत और संगठन-व्यापी प्रशिक्षण प्रगति को ट्रैक करें।",
            pa: "ਗਲਾਸ ਡੈਸ਼ਬੋਰਡ ਇਨਸਾਈਟਸ ਨਾਲ ਵਿਅਕਤੀਗਤ ਅਤੇ ਸੰਗਠਨ-ਪੱਧਰੀ ਸਿਖਲਾਈ ਤਰੱਕੀ ਨੂੰ ਟਰੈਕ ਕਰੋ।",
          }}
          badge={{
            en: "Readiness metrics",
            hi: "तत्परता मेट्रिक्स",
            pa: "ਤਿਆਰੀ ਮੈਟਰਿਕਸ",
          }}
          icon={<TrendingUp className="h-6 w-6" />}
          actions={
            <Button variant="outline" className="gap-2 rounded-2xl" onClick={exportProgress}>
              <Download className="h-4 w-4" />
              <TranslatedText en="Export Progress" hi="प्रगति निर्यात करें" pa="ਤਰੱਕੀ ਨਿਰਯਾਤ ਕਰੋ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Completions", hi: "पूर्णता", pa: "ਸੰਪੂਰਨਤਾ" },
              value: totalCompletions.toString(),
              helper: `+${totalEnrolled > 0 ? Math.round((totalCompletions / totalEnrolled) * 100) : 0}% completion rate`,
            },
            {
              label: { en: "Average time", hi: "औसत समय", pa: "ਔਸਤ ਸਮਾਂ" },
              value: `${avgTime} min`,
              helper: "Per learning path",
            },
            {
              label: { en: "Success rate", hi: "सफलता दर", pa: "ਸਫਲਤਾ ਦਰ" },
              value: `${successRate}%`,
              helper: "Quiz pass rate",
            },
          ]}
        />

        {loading ? (
          <LoadingSpinner text="Loading progress data..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <TranslatedText
                      en="Total Completions"
                      hi="कुल पूर्णता"
                      pa="ਕੁੱਲ ਸੰਪੂਰਨਤਾ"
                    />
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCompletions}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalEnrolled > 0 ? Math.round((totalCompletions / totalEnrolled) * 100) : 0}% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <TranslatedText
                      en="Avg. Time Spent"
                      hi="औसत समय व्यतीत"
                      pa="ਔਸਤ ਸਮਾਂ ਬਿਤਾਇਆ"
                    />
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgTime} min</div>
                  <p className="text-xs text-muted-foreground mt-1">Per module</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <TranslatedText
                      en="Success Rate"
                      hi="सफलता दर"
                      pa="ਸਫਲਤਾ ਦਰ"
                    />
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{successRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Quiz pass rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <TranslatedText
                      en="Certifications"
                      hi="प्रमाणपत्र"
                      pa="ਸਰਟੀਫਿਕੇਸ਼ਨ"
                    />
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCompletions}</div>
                  <p className="text-xs text-muted-foreground mt-1">Issued total</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  <TranslatedText
                    en="Module Progress Overview"
                    hi="मॉड्यूल प्रगति अवलोकन"
                    pa="ਮੋਡੀਊਲ ਤਰੱਕੀ ਅਵਲੋਕਣ"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No modules available
                  </p>
                ) : (
                  modules.map((module) => {
                    const enrolled = module.enrolledUsers?.length || 0;
                    const completed = module.completedUsers?.length || 0;
                    const progress = enrolled > 0 ? Math.round((completed / enrolled) * 100) : 0;
                    return (
                      <ProgressBar
                        key={module._id || module.id}
                        label={module.title}
                        progress={progress}
                        enrolled={enrolled}
                      />
                    );
                  })
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

const ProgressBar = ({
  label,
  progress,
  enrolled,
}: {
  label: string;
  progress: number;
  enrolled: number;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground">
        {progress}% • {enrolled} enrolled
      </span>
    </div>
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default Progress;
