import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, Clock, CheckCircle2 } from "lucide-react";

const Assessments = () => {
  return (
    <DashboardLayout
      title={{
        en: "Assessments",
        hi: "मूल्यांकन",
        pa: "ਮੁਲਾਂਕਣ",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              <TranslatedText
                en="Knowledge Assessments"
                hi="ज्ञान मूल्यांकन"
                pa="ਗਿਆਨ ਮੁਲਾਂਕਣ"
              />
            </h2>
            <p className="text-muted-foreground mt-1">
              <TranslatedText
                en="Create and manage quizzes and assessments"
                hi="क्विज़ और मूल्यांकन बनाएं और प्रबंधित करें"
                pa="ਕੁਇਜ਼ਾਂ ਅਤੇ ਮੁਲਾਂਕਣਾਂ ਬਣਾਓ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰੋ"
              />
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <TranslatedText
              en="Create Assessment"
              hi="मूल्यांकन बनाएं"
              pa="ਮੁਲਾਂਕਣ ਬਣਾਓ"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AssessmentCard
            title="Earthquake Safety Quiz"
            description="Test knowledge on earthquake preparedness"
            questions={15}
            duration={20}
            passingScore={70}
            completions={142}
          />
          <AssessmentCard
            title="Fire Safety Assessment"
            description="Evaluate fire safety procedures understanding"
            questions={20}
            duration={25}
            passingScore={75}
            completions={198}
          />
          <AssessmentCard
            title="First Aid Certification"
            description="Comprehensive first aid knowledge test"
            questions={30}
            duration={45}
            passingScore={80}
            completions={87}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

const AssessmentCard = ({
  title,
  description,
  questions,
  duration,
  passingScore,
  completions,
}: {
  title: string;
  description: string;
  questions: number;
  duration: number;
  passingScore: number;
  completions: number;
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <ClipboardList className="h-4 w-4" />
          <span>{questions} questions</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{duration} min</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <CheckCircle2 className="h-4 w-4" />
          <span>{passingScore}% pass</span>
        </div>
        <div className="text-muted-foreground">{completions} taken</div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <TranslatedText en="Edit" hi="संपादित करें" pa="ਸੰਪਾਦਿਤ ਕਰੋ" />
        </Button>
        <Button size="sm" className="flex-1">
          <TranslatedText en="Take Quiz" hi="क्विज़ लें" pa="ਕੁਇਜ਼ ਲਓ" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default Assessments;
