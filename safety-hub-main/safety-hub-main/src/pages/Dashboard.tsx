import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TranslatedText } from "@/components/TranslatedText";
import { BookOpen, Building2, Siren, Users, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <DashboardLayout
      title={{
        en: "Dashboard",
        hi: "डैशबोर्ड",
        pa: "ਡੈਸ਼ਬੋਰਡ",
      }}
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Modules"
            value="24"
            icon={BookOpen}
            trend="+3 this month"
            variant="primary"
          />
          <StatCard
            title="Registered Facilities"
            value="12"
            icon={Building2}
            trend="All compliant"
            variant="accent"
          />
          <StatCard
            title="Upcoming Drills"
            value="5"
            icon={Siren}
            trend="Next: Tomorrow"
            variant="warning"
          />
          <StatCard
            title="Active Users"
            value="156"
            icon={Users}
            trend="+12 this week"
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Drills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-warning" />
                <TranslatedText
                  en="Upcoming Drills"
                  hi="आगामी अभ्यास"
                  pa="ਆਉਣ ਵਾਲੇ ਅਭਿਆਸ"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DrillItem
                title="Fire Evacuation Drill"
                facility="Main Building"
                date="Tomorrow, 10:00 AM"
                status="scheduled"
              />
              <DrillItem
                title="Earthquake Safety Drill"
                facility="School Campus"
                date="Dec 20, 2:00 PM"
                status="scheduled"
              />
              <DrillItem
                title="Flood Response Drill"
                facility="Community Center"
                date="Dec 22, 9:00 AM"
                status="scheduled"
              />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <TranslatedText
                  en="Recent Activity"
                  hi="हाल की गतिविधि"
                  pa="ਹਾਲੀਆ ਗਤੀਵਿਧੀ"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ActivityItem
                text="New module added: Flood Safety Basics"
                time="2 hours ago"
                type="success"
              />
              <ActivityItem
                text="Drill completed: Fire Evacuation (Building A)"
                time="5 hours ago"
                type="success"
              />
              <ActivityItem
                text="Assessment pending: 15 users need to complete quiz"
                time="1 day ago"
                type="warning"
              />
              <ActivityItem
                text="New facility registered: East Wing"
                time="2 days ago"
                type="success"
              />
            </CardContent>
          </Card>
        </div>

        {/* Modules In Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <TranslatedText
                  en="Training Modules"
                  hi="प्रशिक्षण मॉड्यूल"
                  pa="ਸਿਖਲਾਈ ਮੋਡੀਊਲ"
                />
              </div>
              <Button variant="outline" size="sm">
                <TranslatedText en="View All" hi="सभी देखें" pa="ਸਾਰੇ ਵੇਖੋ" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModuleCard
                title="Earthquake Safety"
                progress={75}
                users={42}
                type="earthquake"
              />
              <ModuleCard
                title="Fire Safety Basics"
                progress={60}
                users={38}
                type="fire"
              />
              <ModuleCard
                title="Flood Response"
                progress={45}
                users={28}
                type="flood"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const DrillItem = ({
  title,
  facility,
  date,
  status,
}: {
  title: string;
  facility: string;
  date: string;
  status: string;
}) => (
  <div className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
    <div className="space-y-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{facility}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
    <span className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-md">
      {status}
    </span>
  </div>
);

const ActivityItem = ({
  text,
  time,
  type,
}: {
  text: string;
  time: string;
  type: "success" | "warning";
}) => (
  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
    {type === "success" ? (
      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
    )}
    <div className="flex-1 space-y-1">
      <p className="text-sm">{text}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

const ModuleCard = ({
  title,
  progress,
  users,
  type,
}: {
  title: string;
  progress: number;
  users: number;
  type: string;
}) => (
  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
    <h4 className="font-medium">{title}</h4>
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-background rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <p className="text-xs text-muted-foreground">{users} users enrolled</p>
  </div>
);

export default Dashboard;
