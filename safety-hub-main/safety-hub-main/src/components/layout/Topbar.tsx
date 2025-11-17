import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TranslatedText } from "@/components/TranslatedText";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  title: {
    en: string;
    hi: string;
    pa: string;
  };
}

export const Topbar = ({ title }: TopbarProps) => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-foreground">
          <TranslatedText {...title} />
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
