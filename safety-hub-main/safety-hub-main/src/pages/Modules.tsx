import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, BookOpen, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Modules = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: { en: "Earthquake Safety Basics", hi: "भूकंप सुरक्षा मूल बातें", pa: "ਭੂਚਾਲ ਸੁਰੱਖਿਆ ਬੁਨਿਆਦੀ" },
      description: { en: "Learn essential earthquake safety procedures", hi: "आवश्यक भूकंप सुरक्षा प्रक्रियाएं सीखें", pa: "ਜ਼ਰੂਰੀ ਭੂਚਾਲ ਸੁਰੱਖਿਆ ਪ੍ਰਕਿਰਿਆਵਾਂ ਸਿੱਖੋ" },
      duration: 45,
      enrolled: 156,
      difficulty: "Beginner",
      type: "earthquake",
    },
    {
      id: 2,
      title: { en: "Fire Safety & Evacuation", hi: "अग्नि सुरक्षा और निकासी", pa: "ਅੱਗ ਸੁਰੱਖਿਆ ਅਤੇ ਨਿਕਾਸ" },
      description: { en: "Comprehensive fire safety training", hi: "व्यापक अग्नि सुरक्षा प्रशिक्षण", pa: "ਵਿਆਪਕ ਅੱਗ ਸੁਰੱਖਿਆ ਸਿਖਲਾਈ" },
      duration: 60,
      enrolled: 203,
      difficulty: "Beginner",
      type: "fire",
    },
    {
      id: 3,
      title: { en: "Flood Response Protocol", hi: "बाढ़ प्रतिक्रिया प्रोटोकॉल", pa: "ਹੜ੍ਹ ਜਵਾਬੀ ਪ੍ਰੋਟੋਕੋਲ" },
      description: { en: "Emergency procedures during floods", hi: "बाढ़ के दौरान आपातकालीन प्रक्रियाएं", pa: "ਹੜ੍ਹਾਂ ਦੌਰਾਨ ਐਮਰਜੈਂਸੀ ਪ੍ਰਕਿਰਿਆਵਾਂ" },
      duration: 50,
      enrolled: 98,
      difficulty: "Intermediate",
      type: "flood",
    },
    {
      id: 4,
      title: { en: "First Aid Fundamentals", hi: "प्राथमिक चिकित्सा मूल बातें", pa: "ਪਹਿਲੀ ਸਹਾਇਤਾ ਬੁਨਿਆਦੀ" },
      description: { en: "Basic first aid and CPR training", hi: "बुनियादी प्राथमिक चिकित्सा और सीपीआर प्रशिक्षण", pa: "ਬੁਨਿਆਦੀ ਪਹਿਲੀ ਸਹਾਇਤਾ ਅਤੇ CPR ਸਿਖਲਾਈ" },
      duration: 90,
      enrolled: 175,
      difficulty: "Beginner",
      type: "medical",
    },
  ];

  return (
    <DashboardLayout
      title={{
        en: "Training Modules",
        hi: "प्रशिक्षण मॉड्यूल",
        pa: "ਸਿਖਲਾਈ ਮੋਡੀਊਲ",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              <TranslatedText
                en="All Training Modules"
                hi="सभी प्रशिक्षण मॉड्यूल"
                pa="ਸਾਰੇ ਸਿਖਲਾਈ ਮੋਡੀਊਲ"
              />
            </h2>
            <p className="text-muted-foreground mt-1">
              <TranslatedText
                en="Browse and manage disaster safety training content"
                hi="आपदा सुरक्षा प्रशिक्षण सामग्री ब्राउज़ करें और प्रबंधित करें"
                pa="ਆਫ਼ਤ ਸੁਰੱਖਿਆ ਸਿਖਲਾਈ ਸਮੱਗਰੀ ਬ੍ਰਾਊਜ਼ ਕਰੋ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰੋ"
              />
            </p>
          </div>
          <Button onClick={() => navigate("/modules/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            <TranslatedText
              en="Create Module"
              hi="मॉड्यूल बनाएं"
              pa="ਮੋਡੀਊਲ ਬਣਾਓ"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/modules/${module.id}`)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      <TranslatedText {...module.title} />
                    </CardTitle>
                    <CardDescription>
                      <TranslatedText {...module.description} />
                    </CardDescription>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {module.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{module.enrolled} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="capitalize">{module.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Modules;
