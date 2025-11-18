import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: {
    en: string;
    hi: string;
    pa: string;
  };
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-mask absolute inset-0 opacity-40" />
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/25 blur-[140px]" />
          <div className="absolute bottom-0 left-12 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[180px]" />
        </div>

        <div className="relative flex min-h-screen w-full gap-0">
          <AppSidebar />
          <div className="flex-1 flex flex-col gap-6 px-4 py-6 md:px-12">
            <Topbar title={title} />
            <main className="flex-1 w-full max-w-6xl mx-auto pb-12">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
