import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  FileText,
  TrendingUp,
  Users,
  ShieldCheck,
  Sparkles,
  Activity,
  ArrowUpRight,
  Clock,
  MapPin,
  LogOut,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { AuthContext } from "../contexts/AuthContext";

const statCards = [
  {
    title: { en: "Active Alerts", hi: "सक्रिय चेतावनी", pa: "ਸਕਰੀਆ ਚੇਤਾਵਨੀ" },
    value: "12",
    change: "+5.2%",
    icon: AlertTriangle,
    accent: "bg-gradient-to-br from-red-100 to-pink-100 text-red-600",
  },
  {
    title: {
      en: "Reports Submitted",
      hi: "दर्ज रिपोर्टें",
      pa: "ਜਮ੍ਹਾ ਰਿਪੋਰਟਾਂ",
    },
    value: "48",
    change: "+12%",
    icon: FileText,
    accent: "bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600",
  },
  {
    title: {
      en: "Engaged Learners",
      hi: "सक्रिय शिक्षार्थी",
      pa: "ਸਕਰੀਆ ਸਿੱਖਣ ਵਾਲੇ",
    },
    value: "1,024",
    change: "+3.1%",
    icon: Users,
    accent: "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600",
  },
  {
    title: { en: "Readiness Score", hi: "तत्परता स्कोर", pa: "ਤਿਆਰੀ ਸਕੋਰ" },
    value: "92%",
    change: "+2%",
    icon: TrendingUp,
    accent: "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600",
  },
];

const quickActions = [
  {
    icon: FileText,
    label: {
      en: "Submit Report",
      hi: "रिपोर्ट जमा करें",
      pa: "ਰਿਪੋਰਟ ਜਮ੍ਹਾ ਕਰੋ",
    },
    highlight: "Form 12A",
    href: "/submit-report",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: AlertTriangle,
    label: { en: "Raise Alert", hi: "अलर्ट बनाएं", pa: "ਅਲਰਟ ਬਣਾਓ" },
    highlight: "Fire / Flood / Seismic",
    href: "/alerts",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    label: {
      en: "Launch Drill",
      hi: "अभ्यास शुरू करें",
      pa: "ਡ੍ਰਿਲ ਸ਼ੁਰੂ ਕਰੋ",
    },
    highlight: "Campus-wide",
    href: "/drills",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users,
    label: { en: "Team Directory", hi: "टीम निर्देशिका", pa: "ਟੀਮ ਡਾਇਰੈਕਟਰੀ" },
    highlight: "Coordinators & leads",
    href: "/users",
    color: "from-purple-500 to-indigo-500",
  },
];

const recentActivity = [
  { title: "New alert created", meta: "Community Center • 12 min ago" },
  { title: "Report escalated", meta: "Warehouse 3 • 38 min ago" },
  { title: "Training completed", meta: "Earthquake Basics • 2 h ago" },
  { title: "Drill scheduled", meta: "Flood response • Tomorrow" },
];

const upcomingDrills = [
  {
    title: "Fire Evacuation Drill",
    date: "19 Dec · 10:00 AM",
    location: "Main Building",
    status: "Scheduled",
  },
  {
    title: "Earthquake Safety Drill",
    date: "20 Dec · 2:00 PM",
    location: "School Campus",
    status: "Scheduled",
  },
  {
    title: "Flood Response Review",
    date: "22 Dec · 11:30 AM",
    location: "Command Center",
    status: "Planning",
  },
];

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title={{
        en: "Command Center",
        hi: "कमांड सेंटर",
        pa: "ਕਮਾਂਡ ਸੈਂਟਰ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "Safety Hub Dashboard",
            hi: "सेफ्टी हब डैशबोर्ड",
            pa: "ਸੇਫਟੀ ਹੱਬ ਡੈਸ਼ਬੋਰਡ",
          }}
          description={{
            en: "Real-time view of alerts, incidents, drills, and learner readiness across every facility.",
            hi: "हर सुविधा में चेतावनियों, घटनाओं, अभ्यासों और शिक्षार्थी की तत्परता का रियल-टाइम दृश्य।",
            pa: "ਹਰ ਸਹੂਲਤ ਵਿੱਚ ਚੇਤਾਵਨੀਆਂ, ਘਟਨਾਵਾਂ, ਅਭਿਆਸ ਅਤੇ ਸਿੱਖਣ ਵਾਲਿਆਂ ਦੀ ਤਿਆਰੀ ਦਾ ਰੀਅਲ-ਟਾਈਮ ਨਜ਼ਾਰਾ।",
          }}
          badge={{
            en: "Live overview",
            hi: "लाइव अवलोकन",
            pa: "ਲਾਈਵ ਝਲਕ",
          }}
          icon={<Sparkles className="h-6 w-6" />}
          actions={
            <>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/submit-report")}
              >
                <FileText className="h-4 w-4" />
                <TranslatedText
                  en="Log incident"
                  hi="घटना दर्ज करें"
                  pa="ਘਟਨਾ ਦਰਜ ਕਰੋ"
                />
              </Button>
              <Button
                variant="ghost"
                className="gap-2 text-destructive"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut className="h-4 w-4" />
                <TranslatedText en="Logout" hi="लॉगआउट" pa="ਲਾੱਗ ਆਊਟ" />
              </Button>
            </>
          }
          highlights={[
            {
              label: {
                en: "Current user",
                hi: "वर्तमान उपयोगकर्ता",
                pa: "ਮੌਜੂਦਾ ਵਰਤੋਂਕਾਰ",
              },
              value: user?.name || "Operations Team",
              helper: user?.role || "Coordinator",
            },
            {
              label: {
                en: "Facilities online",
                hi: "ऑनलाइन सुविधाएं",
                pa: "ਓਨਲਾਈਨ ਸਹੂਲਤਾਂ",
              },
              value: "08",
              helper: "Monitoring feed stable",
            },
            {
              label: { en: "Next sync", hi: "अगला सिंक", pa: "ਅਗਲਾ ਸਿੰਕ" },
              value: "04:12",
              helper: "Auto-refresh timer",
            },
          ]}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title.en} className="glass-panel border-white/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <TranslatedText {...stat.title} />
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-2xl p-3 ${stat.accent}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-emerald-500">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="glass-panel border-white/60 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                <TranslatedText
                  en="Quick Actions"
                  hi="त्वरित कार्य"
                  pa="ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ"
                />
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {quickActions.map((action) => (
                <button
                  key={action.href}
                  onClick={() => navigate(action.href)}
                  className="group flex items-start gap-3 rounded-[20px] border border-white/60 bg-gradient-to-br from-white/80 to-white/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:from-white hover:to-white/80"
                >
                  <span
                    className={`rounded-2xl bg-gradient-to-br ${
                      action.color
                    } p-2 text-white shadow-lg shadow-${
                      action.color.split("-")[1]
                    }-200`}
                  >
                    <action.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      <TranslatedText {...action.label} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.highlight}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <TranslatedText
                  en="Recent Activity"
                  hi="हाल की गतिविधि"
                  pa="ਤਾਜ਼ਾ ਗਤੀਵਿਧੀ"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-primary/40 pl-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="glass-panel border-white/60 lg:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>
                <TranslatedText
                  en="Readiness Insights"
                  hi="तत्परता अंतर्दृष्टि"
                  pa="ਤਿਆਰੀ ਅੰਤਰਦ੍ਰਿਸ਼ਟੀ"
                />
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <InsightTile
                title="Drill coverage"
                value="78%"
                meta="8 / 10 facilities rehearsed"
              />
              <InsightTile
                title="Assessment success"
                value="87%"
                meta="Quiz pass rate (rolling)"
              />
              <InsightTile
                title="Average response"
                value="12m"
                meta="Alert acknowledgment time"
              />
              <InsightTile
                title="Learning momentum"
                value="342"
                meta="Certifications issued"
              />
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/60">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>
                <TranslatedText
                  en="Upcoming Drills"
                  hi="आगामी अभ्यास"
                  pa="ਆਉਣ ਵਾਲੇ ਅਭਿਆਸ"
                />
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDrills.map((drill) => (
                <div
                  key={drill.title}
                  className="rounded-2xl border border-white/60 bg-white/70 p-4"
                >
                  <p className="font-semibold text-foreground">{drill.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {drill.date}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {drill.location}
                  </p>
                  <span className="mt-3 inline-flex rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs text-primary">
                    {drill.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

const InsightTile = ({ title, value, meta }) => (
  <div className="rounded-[24px] border border-white/60 bg-white/70 p-4 shadow-sm">
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
      {title}
    </p>
    <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{meta}</p>
    <div className="mt-3 flex items-center gap-1 text-xs text-emerald-500">
      <ArrowUpRight className="h-3 w-3" />
      Stable trend
    </div>
  </div>
);
