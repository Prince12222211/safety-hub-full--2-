import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TranslatedText } from "@/components/TranslatedText";
import { BookOpen, Building2, Siren, Users, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, Shield, Activity, TrendingUp, Zap, Target, Award, Calendar, MapPin, Flame, Droplets, AlertCircle as AlertCircleIcon } from "lucide-react";
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
            <StatCard title="Active Modules" value="24" icon={BookOpen} trend="+3 this month" variant="primary" />
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard title="Registered Facilities" value="12" icon={Building2} trend="All compliant" variant="accent" />
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard title="Upcoming Drills" value="5" icon={Siren} trend="Next: Tomorrow" variant="warning" />
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard title="Active Users" value="156" icon={Users} trend="+12 this week" variant="default" />
          </motion.div>
        </motion.div>

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
                {drillTimeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <DrillItem {...item} />
                  </motion.div>
                ))}
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
                <ActivityItem text="New module added: Flood Safety Basics" time="2 hours ago" type="success" />
                <ActivityItem text="Drill completed: Fire Evacuation (Building A)" time="5 hours ago" type="success" />
                <ActivityItem text="Assessment pending: 15 users need to complete quiz" time="1 day ago" type="warning" />
                <ActivityItem text="New facility registered: East Wing" time="2 days ago" type="success" />
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <ModuleCard title="Earthquake Safety" progress={75} users={42} type="earthquake" />
                <ModuleCard title="Fire Safety Basics" progress={60} users={38} type="fire" />
                <ModuleCard title="Flood Response" progress={45} users={28} type="flood" />
              </div>
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
              </div>
            </CardContent>
          </Card>
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

export default Dashboard;
