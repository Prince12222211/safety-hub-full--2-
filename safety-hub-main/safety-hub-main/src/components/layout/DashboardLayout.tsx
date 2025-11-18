import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { motion } from "framer-motion";

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
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/25 blur-[140px]"
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 left-12 h-[460px] w-[460px] rounded-full bg-accent/25 blur-[200px]"
          />
        </div>

        <div className="relative flex min-h-screen w-full gap-0">
          <AppSidebar />
          <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 md:px-12">
            <Topbar title={title} />
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 pb-12">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
