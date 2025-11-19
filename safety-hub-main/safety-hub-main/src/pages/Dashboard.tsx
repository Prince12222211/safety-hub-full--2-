import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TranslatedText } from "@/components/TranslatedText";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { BookOpen, Building2, Siren, Users, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, Shield, Activity, TrendingUp, Zap, Target, Award, Calendar, MapPin, Flame, Droplets, AlertCircle as AlertCircleIcon, Globe2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "../services/alertService";
import { getModules } from "../services/moduleService";
import { getFacilities } from "../services/facilityService";
import { getDrills } from "../services/drillService";
import { getAssessments } from "../services/assessmentService";
import { getReports } from "../services/reportService";
import { getLatestNews, NewsArticle } from "../services/newsService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Cell } from "recharts";

const readinessTrend = [
  { label: "Apr", value: 72 },
  { label: "May", value: 78 },
  { label: "Jun", value: 81 },
  { label: "Jul", value: 84 },
  { label: "Aug", value: 86 },
  { label: "Sep", value: 88 },
  { label: "Oct", value: 91 },
  { label: "Nov", value: 93 },
];

const modulePerformance = [
  { name: "Earthquake", value: 85, color: "hsl(var(--primary))" },
  { name: "Fire", value: 72, color: "hsl(var(--destructive))" },
  { name: "Flood", value: 58, color: "hsl(var(--accent))" },
  { name: "First Aid", value: 91, color: "hsl(var(--warning))" },
];

const drillTimeline = [
  {
    title: "Fire Evacuation",
    facility: "Main HQ",
    date: "Tomorrow, 10:00 AM",
    status: "scheduled",
    type: "fire",
    participants: 156,
    icon: Flame
  },
  {
    title: "Earthquake Simulation",
    facility: "Campus A",
    date: "Dec 20, 2:00 PM",
    status: "scheduled",
    type: "earthquake",
    participants: 320,
    icon: AlertCircleIcon
  },
  {
    title: "Flood Response",
    facility: "Warehouse 4",
    date: "Dec 22, 9:00 AM",
    status: "scheduled",
    type: "flood",
    participants: 180,
    icon: Droplets
  },
];

const Dashboard = () => {
  // Real-time data fetching with polling
  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: modules = [], isLoading: modulesLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: facilities = [], isLoading: facilitiesLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
    refetchInterval: 60000,
  });

  const { data: drills = [], isLoading: drillsLoading } = useQuery({
    queryKey: ["drills"],
    queryFn: getDrills,
    refetchInterval: 60000,
  });

  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    refetchInterval: 60000,
  });

  const { data: reports = [], isLoading: reportsLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    refetchInterval: 60000,
  });

  const {
    data: newsArticles = [],
    isLoading: newsLoading,
    isError: newsError,
  } = useQuery<NewsArticle[]>({
    queryKey: ["latest-news"],
    queryFn: getLatestNews,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, // Refresh every 5 minutes
  });

  const isLoading = alertsLoading || modulesLoading || facilitiesLoading || drillsLoading || assessmentsLoading || reportsLoading;

  // Calculate real stats from backend data
  const activeModules = modules.length;
  const registeredFacilities = facilities.length;
  const upcomingDrills = drills.filter(d => d.status === 'scheduled' && new Date(d.scheduledDate) > new Date()).length;
  const activeUsers = modules.reduce((sum, m) => sum + (m.enrolledUsers?.length || 0), 0);

  // Get upcoming drills for timeline
  const upcomingDrillsList = drills
    .filter(d => d.status === 'scheduled' && new Date(d.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    .slice(0, 3)
    .map(drill => ({
      title: drill.title,
      facility: typeof drill.facility === 'object' ? drill.facility.name : 'Unknown',
      date: new Date(drill.scheduledDate).toLocaleDateString() + " " + new Date(drill.scheduledDate).toLocaleTimeString(),
      status: drill.status,
      type: drill.type,
      participants: drill.participants?.length || 0,
      icon: drill.type === 'fire' ? Flame : drill.type === 'flood' ? Droplets : AlertCircleIcon
    }));

  // Module performance data
  const modulePerformance = modules.slice(0, 4).map(m => ({
    name: m.title,
    value: m.enrolledUsers?.length || 0,
    color: "hsl(var(--primary))"
  }));

  return (
    <DashboardLayout
      title={{
        en: "Dashboard",
        hi: "डैशबोर्ड",
        pa: "ਡੈਸ਼ਬੋਰਡ",
      }}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-white/80 via-white/70 to-primary/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-grid-white/10 opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 font-semibold text-primary shadow-lg shadow-primary/10"
                >
                  <Shield className="h-4 w-4" />
                  Mission Control
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="hidden items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-accent md:flex"
                >
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Live
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                  Real-time readiness for every facility, drill, and learning path.
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Monitor compliance, orchestrate drills, and close training gaps from a single glass control room.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Button size="lg" className="gap-2 rounded-2xl px-6">
                  Launch Command
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl border-dashed px-6">
                  Download Readiness Pack
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-[28px] border border-white/60 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-8 shadow-xl"
            >
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Organization readiness</span>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    Updated 2m ago
                  </Badge>
                </div>
                <div className="space-y-2">
                  <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-6xl font-bold text-primary"
                  >
                    93%
                  </motion.p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="font-medium text-accent">+8%</span>
                    <span className="text-muted-foreground">vs last quarter</span>
                  </div>
                </div>
                <div className="mt-6 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={readinessTrend}>
                      <defs>
                        <linearGradient id="readiness" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--primary),0.1)" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        stroke="hsla(var(--foreground),0.5)"
                        fontSize={12}
                      />
                      <YAxis hide domain={[60, 100]} />
                      <Tooltip
                        cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                        contentStyle={{
                          borderRadius: 16,
                          border: "1px solid hsl(var(--primary)/0.2)",
                          background: "hsl(var(--card))",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        fill="url(#readiness)"
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        {isLoading ? (
          <LoadingSpinner text="Loading dashboard data..." />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatCard title="Active Modules" value={activeModules.toString()} icon={BookOpen} trend={`${modules.filter(m => m.isActive).length} active`} variant="primary" />
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatCard title="Registered Facilities" value={registeredFacilities.toString()} icon={Building2} trend={`${facilities.filter(f => f.isActive).length} active`} variant="accent" />
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatCard title="Upcoming Drills" value={upcomingDrills.toString()} icon={Siren} trend={upcomingDrills > 0 ? "Scheduled" : "None scheduled"} variant="warning" />
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatCard title="Active Users" value={activeUsers.toString()} icon={Users} trend={`${alerts.length} alerts`} variant="default" />
            </motion.div>
          </motion.div>
        )}

        {/* Timeline and Activity */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr,1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-panel border-white/60 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  Operational Timeline
                </CardTitle>
                <Button variant="outline" size="sm" className="rounded-full border-dashed">
                  <Calendar className="mr-2 h-4 w-4" />
                  View calendar
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {upcomingDrillsList.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming drills scheduled</p>
                ) : (
                  upcomingDrillsList.map((item, index) => {
                    const IconComponent = item.icon || Siren;
                    return (
                      <motion.div
                        key={`${item.title}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <DrillItem {...item} icon={IconComponent} />
                      </motion.div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-panel border-white/60">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <TranslatedText en="Recent Activity" hi="हाल की गतिविधि" pa="ਹਾਲੀਆ ਗਤੀਵਿਧੀ" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {alerts.length === 0 && reports.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                ) : (
                  <>
                    {alerts.slice(0, 2).map((alert, idx) => (
                      <ActivityItem 
                        key={`alert-${idx}`}
                        text={`Alert: ${alert.title || 'Safety Alert'} - ${alert.severity || 'Medium'} severity`}
                        time={new Date(alert.createdAt).toLocaleString()}
                        type={alert.severity === 'critical' ? 'warning' : 'success'}
                      />
                    ))}
                    {reports.slice(0, 2).map((report, idx) => (
                      <ActivityItem
                        key={`report-${idx}`}
                        text={`Report: ${report.title} - Priority: ${report.priority}`}
                        time={new Date(report.createdAt).toLocaleString()}
                        type={report.priority === 'critical' ? 'warning' : 'success'}
                      />
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Training Modules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-panel border-white/60">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <TranslatedText en="Training Modules" hi="प्रशिक्षण मॉड्यूल" pa="ਸਿਖਲਾਈ ਮੋਡੀਊਲ" />
                </CardTitle>
                <Button variant="outline" size="sm" className="rounded-full">
                  <TranslatedText en="View All" hi="सभी देखें" pa="ਸਾਰੇ ਵੇਖੋ" />
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="mt-2">
                Track progress across all safety training modules
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {modules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No modules available</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {modules.slice(0, 3).map((module) => {
                    const enrolled = module.enrolledUsers?.length || 0;
                    const completed = module.completedUsers?.length || 0;
                    const progress = enrolled > 0 ? Math.round((completed / enrolled) * 100) : 0;
                    return (
                      <ModuleCard
                        key={module._id}
                        title={module.title}
                        progress={progress}
                        users={enrolled}
                        type={module.category || module.type}
                      />
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-panel border-white/60">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Module Performance Overview
              </CardTitle>
              <CardDescription>Completion rates across all training modules</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64">
                {modulePerformance.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No module data available</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modulePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--foreground),0.1)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      stroke="hsla(var(--foreground),0.6)"
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      stroke="hsla(var(--foreground),0.6)"
                      fontSize={12}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      cursor={{ fill: "hsla(var(--primary),0.1)" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(var(--primary)/0.2)",
                        background: "hsl(var(--card))",
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {modulePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Situation Awareness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-panel border-white/60 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2">
                  <Globe2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Global Situation Feed</CardTitle>
                  <CardDescription>Live disaster & safety headlines refreshed every few minutes</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="rounded-full border-dashed">
                Auto-refresh · 5 min
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              {newsLoading ? (
                <LoadingSpinner size="md" text="Fetching latest situational intelligence..." />
              ) : newsError ? (
                <p className="text-sm text-destructive">Unable to load news feed right now.</p>
              ) : newsArticles.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent headlines available.</p>
              ) : (
                <div className="space-y-4">
                  {newsArticles.map((article, idx) => (
                    <NewsItem key={`${article.title}-${idx}`} article={article} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-[28px] border border-white/60 bg-gradient-to-br from-white/80 to-white/60 p-8 shadow-lg"
        >
          <div className="mb-6 space-y-2">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              Advanced Analytics
            </h3>
            <p className="text-muted-foreground">Comprehensive metrics and performance insights</p>
          </div>
          <AnalyticsDashboard />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const DrillItem = ({
  title,
  facility,
  date,
  status,
  type,
  participants,
  icon: Icon,
}: {
  title: string;
  facility: string;
  date: string;
  status: string;
  type?: string;
  participants?: number;
  icon?: any;
}) => {
  const IconComponent = Icon || Siren;
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      className="group relative flex items-start gap-4 rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/60 p-4 shadow-sm transition-all hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm">
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-sm">{title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{facility}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          {participants && (
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{participants} participants</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ActivityItem = ({
  text,
  time,
  type,
}: {
  text: string;
  time: string;
  type: "success" | "warning";
}) => (
  <motion.div
    whileHover={{ x: 4 }}
    className="group flex items-start gap-3 rounded-xl border border-white/60 bg-gradient-to-br from-white/70 to-white/50 p-3 transition-all hover:shadow-md"
  >
    <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${type === "success"
        ? "bg-accent/10 text-accent"
        : "bg-warning/10 text-warning"
      }`}>
      {type === "success" ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <AlertTriangle className="h-4 w-4" />
      )}
    </div>
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium">{text}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{time}</span>
      </div>
    </div>
  </motion.div>
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
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case "earthquake":
        return AlertCircleIcon;
      case "fire":
        return Flame;
      case "flood":
        return Droplets;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "earthquake":
        return "from-primary/20 to-primary/10";
      case "fire":
        return "from-destructive/20 to-destructive/10";
      case "flood":
        return "from-accent/20 to-accent/10";
      default:
        return "from-muted/20 to-muted/10";
    }
  };

  const Icon = getTypeIcon();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/60 p-5 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-xl bg-gradient-to-br ${getTypeColor()} p-2.5`}>
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-sm">{title}</h4>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Progress</span>
            <span className="font-bold text-foreground">{progress}%</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{users} users enrolled</span>
        </div>
      </div>
    </motion.div>
  );
};

const NewsItem = ({ article }: { article: NewsArticle }) => {
  const publishedTime = article.publishedAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(article.publishedAt))
    : "Just now";

  return (
    <motion.a
      href={article.url || "#"}
      target={article.url ? "_blank" : "_self"}
      rel="noreferrer"
      whileHover={{ x: 4 }}
      className="group block rounded-2xl border border-white/60 bg-white/70 p-4 transition-all hover:border-primary/40 hover:bg-white/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{article.title}</p>
          {article.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {article.description}
            </p>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {article.source && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
            <Globe2 className="h-3 w-3" />
            {article.source}
          </span>
        )}
        <span>{publishedTime}</span>
      </div>
    </motion.a>
  );
};

export default Dashboard;
