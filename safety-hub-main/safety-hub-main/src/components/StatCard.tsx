import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "accent" | "warning" | "destructive";
}

const variantStyles = {
  default: {
    card: "bg-white/90 border-white/60 text-foreground",
    glow: "from-slate-200/70 via-transparent to-transparent",
  },
  primary: {
    card: "bg-gradient-to-br from-primary/10 via-white/80 to-white text-primary border-primary/20",
    glow: "from-primary/40 via-transparent to-transparent",
  },
  accent: {
    card: "bg-gradient-to-br from-accent/10 via-white/80 to-white text-accent border-accent/20",
    glow: "from-accent/30 via-transparent to-transparent",
  },
  warning: {
    card: "bg-gradient-to-br from-warning/10 via-white/80 to-white text-warning border-warning/20",
    glow: "from-warning/35 via-transparent to-transparent",
  },
  destructive: {
    card: "bg-gradient-to-br from-destructive/10 via-white/80 to-white text-destructive border-destructive/20",
    glow: "from-destructive/35 via-transparent to-transparent",
  },
};

export const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  const config = variantStyles[variant];

  return (
    <Card className={cn("relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5", config.card)}>
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 blur-3xl", config.glow)} />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
            <p className="text-4xl font-semibold text-foreground">{value}</p>
            {trend && (
              <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                {trend}
              </span>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border border-white/60 bg-white/70 p-3 text-foreground shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
