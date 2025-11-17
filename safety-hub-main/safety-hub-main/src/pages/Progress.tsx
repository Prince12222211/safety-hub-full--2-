import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Target, Award } from "lucide-react";

const Progress = () => {
  return (
    <DashboardLayout
      title={{
        en: "Progress Tracking",
        hi: "प्रगति ट्रैकिंग",
        pa: "ਤਰੱਕੀ ਟਰੈਕਿੰਗ",
      }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            <TranslatedText
              en="Learning Progress"
              hi="सीखने की प्रगति"
              pa="ਸਿੱਖਣ ਦੀ ਤਰੱਕੀ"
            />
          </h2>
          <p className="text-muted-foreground mt-1">
            <TranslatedText
              en="Track individual and organization-wide training progress"
              hi="व्यक्तिगत और संगठन-व्यापी प्रशिक्षण प्रगति ट्रैक करें"
              pa="ਵਿਅਕਤੀਗਤ ਅਤੇ ਸੰਗਠਨ-ਵਿਆਪੀ ਸਿਖਲਾਈ ਦੀ ਤਰੱਕੀ ਟਰੈਕ ਕਰੋ"
            />
          </p>
        </div>

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
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
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
              <div className="text-2xl font-bold">42 min</div>
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
              <div className="text-2xl font-bold">87%</div>
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
              <div className="text-2xl font-bold">342</div>
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
            <ProgressBar
              label="Earthquake Safety"
              progress={85}
              enrolled={156}
            />
            <ProgressBar label="Fire Safety" progress={72} enrolled={203} />
            <ProgressBar label="Flood Response" progress={58} enrolled={98} />
            <ProgressBar
              label="First Aid"
              progress={91}
              enrolled={175}
            />
          </CardContent>
        </Card>
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
