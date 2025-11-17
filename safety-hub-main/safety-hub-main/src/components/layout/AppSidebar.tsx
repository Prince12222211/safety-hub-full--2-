import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  Users,
  ClipboardList,
  Siren,
  TrendingUp,
} from "lucide-react";
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

const menuItems = [
  {
    title: { en: "Dashboard", hi: "डैशबोर्ड", pa: "ਡੈਸ਼ਬੋਰਡ" },
    url: "/dashboard",
    icon: LayoutDashboard,
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
      <SidebarContent>
        <div className="p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-sidebar-primary flex items-center gap-2">
              <Siren className="h-5 w-5" />
              <TranslatedText
                en="Disaster Safety"
                hi="आपदा सुरक्षा"
                pa="ਆਫ਼ਤ ਸੁਰੱਖਿਆ"
              />
            </h2>
          )}
          {isCollapsed && <Siren className="h-5 w-5 text-sidebar-primary mx-auto" />}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && (
              <TranslatedText en="Main Menu" hi="मुख्य मेनू" pa="ਮੁੱਖ ਮੀਨੂ" />
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <TranslatedText {...item.title} />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
