import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Waves, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const heroStats = [
  { label: "Facilities protected", value: "48", subtext: "Hospitals, schools, plants" },
  { label: "Simulations automated", value: "320+", subtext: "Fire, flood, seismic" },
  { label: "Learners onboarded", value: "12k", subtext: "Across 7 regions" },
];

const features = [
  "Unified drills, alerts, facilities intelligence",
  "Bilingual experience with instant translation",
  "Glass dashboard with predictive insights",
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-primary/20 blur-[180px]" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[200px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16 md:px-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Safety Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <Button asChild className="gap-2 rounded-full px-5">
              <Link to="/dashboard">
                Launch Console
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>

        <main className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Command Center OS
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Bring drills, alerts, training, and facilities together in one luminous control room.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-muted-foreground"
            >
              Safety Hub modernizes disaster preparedness with guided drills, multilingual learning, and predictive readiness intelligence.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link to="/login" className="flex items-center gap-2">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-dashed px-8 text-base">
                <a href="https://example.com/demo" target="_blank" rel="noreferrer">
                  Watch demo
                </a>
              </Button>
            </div>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-white/70 text-xs text-primary shadow-sm">
                    <Waves className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[36px] border border-white/60 bg-white/80 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Preview · Live readiness</span>
              <span>Streaming data</span>
            </div>
            <div className="mt-6 space-y-6">
              <div className="rounded-[28px] border border-white/60 bg-gradient-to-br from-primary/15 via-white/80 to-accent/10 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Global score</p>
                <p className="mt-3 text-4xl font-semibold text-primary">93%</p>
                <p className="text-sm text-muted-foreground">+8% vs last quarter</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 text-sm">
                    <p className="text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm text-primary">
                Automated insights predict drill fatigue 4 days earlier than manual tracking.
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Index;
