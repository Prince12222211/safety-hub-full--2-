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
          className="rounded-[28px] border border-white/40 bg-gradient-to-br from-primary/15 via-white/90 to-white/70 p-4 text-sidebar-foreground shadow-[0_25px_60px_rgba(79,70,229,0.25)] backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -5, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/50"
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
              <Sparkles className="h-4 w-4 text-primary" />
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
                      className="group flex items-center gap-3 rounded-[20px] px-3 py-2 text-sm text-sidebar-foreground/70 transition-all hover:translate-x-1 hover:text-sidebar-primary"
                      activeClassName="bg-gradient-to-r from-primary/15 to-primary/5 text-sidebar-primary shadow-[0_15px_45px_rgba(79,70,229,0.25)]"
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/70 text-sidebar-primary transition-colors group-hover:bg-primary/10"
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.span>
                      {!isCollapsed && <TranslatedText {...item.title} />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto space-y-4">
          <div className="rounded-[26px] border border-white/40 bg-white/80 p-4 text-xs text-sidebar-foreground/70 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <p className="font-semibold text-sidebar-foreground">Readiness Score</p>
            {!isCollapsed && (
              <>
                <p className="mt-1 text-3xl font-bold text-sidebar-primary">92%</p>
                <p className="mt-1">All systems green. Continue scheduled drills.</p>
              </>
            )}
          </div>
          <NavLink
            to="/submit-report"
            className="flex items-center justify-center gap-2 rounded-[26px] border border-dashed border-sidebar-primary/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-sidebar-primary transition hover:bg-primary/20"
          >
            <FilePlus2 className="h-4 w-4" />
            {!isCollapsed && "Submit Incident"}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
