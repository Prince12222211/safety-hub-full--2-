import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Building2, Users, ClipboardList, Siren, TrendingUp, Sparkles, ShieldAlert, FilePlus2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TranslatedText } from "@/components/TranslatedText";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: { en: "Dashboard", hi: "डैशबोर्ड", pa: "ਡੈਸ਼ਬੋਰਡ" },
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: { en: "Alerts", hi: "चेतावनी", pa: "ਚੇਤਾਵਨੀ" },
    url: "/alerts",
    icon: ShieldAlert,
  },
  {
    title: { en: "Training Modules", hi: "प्रशिक्षण मॉड्यूल", pa: "ਸਿਖਲਾਈ ਮੋਡੀਊਲ" },
    url: "/modules",
    icon: BookOpen,
  },
  {
    title: { en: "Facilities", hi: "सुविधाएं", pa: "ਸਹੂਲਤਾਂ" },
    url: "/facilities",
    icon: Building2,
  },
  {
    title: { en: "Drills", hi: "अभ्यास", pa: "ਅਭਿਆਸ" },
    url: "/drills",
    icon: Siren,
  },
  {
    title: { en: "Assessments", hi: "मूल्यांकन", pa: "ਮੁਲਾਂਕਣ" },
    url: "/assessments",
    icon: ClipboardList,
  },
  {
    title: { en: "Users", hi: "उपयोगकर्ता", pa: "ਵਰਤੋਂਕਾਰ" },
    url: "/users",
    icon: Users,
  },
  {
    title: { en: "Progress", hi: "प्रगति", pa: "ਤਰੱਕੀ" },
    url: "/progress",
    icon: TrendingUp,
  },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="gap-6 p-4">
        <motion.div
          layout
          className="rounded-[28px] border border-white/40 bg-gradient-to-br from-purple-100/80 via-indigo-100/60 to-blue-100/50 p-4 text-sidebar-foreground shadow-[0_25px_60px_rgba(147,51,234,0.15)] backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -5, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50"
            >
              <Siren className="h-6 w-6" />
            </motion.div>
            {!isCollapsed && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sidebar-foreground/60">Safety Hub</p>
                <p className="text-lg font-semibold text-sidebar-foreground">Command Center</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <p className="mt-4 flex items-center gap-2 text-xs text-sidebar-foreground/70">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Monitor training, drills & facilities from a single glass dashboard.
            </p>
          )}
        </motion.div>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-sidebar-foreground/50">
            {!isCollapsed && (
              <TranslatedText en="Navigation" hi="नेविगेशन" pa="ਨੇਵੀਗੇਸ਼ਨ" />
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} className="rounded-2xl p-0">
                    <NavLink
                      to={item.url}
                      className="group relative flex items-center gap-3 rounded-[20px] px-4 py-3 text-sm font-medium text-sidebar-foreground/70 transition-all duration-200 hover:text-sidebar-primary hover:shadow-lg hover:shadow-primary/20"
                      activeClassName="bg-gradient-to-r from-primary/20 to-primary/10 text-sidebar-primary shadow-[0_15px_45px_rgba(79,70,229,0.25)] border-l-4 border-primary"
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex h-10 w-10 items-center justify-center flex-shrink-0 rounded-lg bg-white/60 text-sidebar-foreground/70 transition-all duration-200 group-hover:bg-primary/15 group-hover:text-primary"
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.span>
                      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {!isCollapsed && <TranslatedText {...item.title} />}
                      </span>
                      <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 -z-10" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="rounded-[26px] border border-white/40 bg-gradient-to-br from-gradient-to-br from-emerald-100/80 via-teal-100/60 to-cyan-100/50 p-4 text-xs text-sidebar-foreground/70 shadow-[0_20px_50px_rgba(16,185,129,0.12)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(16,185,129,0.2)]"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sidebar-foreground">Readiness Score</p>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-200 text-green-700 rounded-full text-[10px] font-bold">
                ✓ Active
              </span>
            </div>
            {!isCollapsed && (
              <>
                <p className="mt-2 text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">92%</p>
                <p className="mt-2 text-sidebar-foreground/60 leading-relaxed">All systems green. Continue scheduled drills.</p>
              </>
            )}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition-all duration-200"
          >
            <NavLink
              to="/submit-report"
              className="flex items-center justify-center gap-2 rounded-[26px] border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-500/20 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <FilePlus2 className="h-4 w-4" />
              {!isCollapsed && "Submit Incident"}
            </NavLink>
          </motion.div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
