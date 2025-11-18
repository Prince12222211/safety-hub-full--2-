import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TranslatedText } from "@/components/TranslatedText";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title: {
    en: string;
    hi: string;
    pa: string;
  };
}

export const Topbar = ({ title }: TopbarProps) => {
  return (
    <header className="glass-panel sticky top-4 z-20 flex flex-wrap items-center justify-between gap-4 border border-white/60 px-4 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="rounded-2xl border border-white/60 bg-white/70 text-foreground shadow-sm shadow-black/5" />
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Realtime Overview</p>
          <h1 className="text-2xl font-semibold text-foreground">
            <TranslatedText {...title} />
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden max-w-sm flex-1 items-center rounded-2xl border border-white/60 bg-white/70 px-3 py-1.5 shadow-sm md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            className="border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
            placeholder="Search facilities, drills, modules..."
          />
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/60 px-3 py-1 text-xs text-muted-foreground lg:flex">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Systems stable
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl border border-white/60 bg-transparent text-foreground shadow-sm">
          <Bell className="h-4 w-4" />
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
