import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Animated Background Elements */}
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

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="glass-panel border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <div className="relative rounded-full bg-primary/10 p-6">
                    <AlertCircle className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-7xl font-bold text-foreground mb-4"
              >
                404
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold text-foreground mb-2"
              >
                Page Not Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground mb-8 max-w-md mx-auto"
              >
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              >
                <Button asChild size="lg" className="gap-2 rounded-2xl">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 rounded-2xl">
                  <Link to="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <p className="text-sm text-muted-foreground mb-3">Quick Links:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/alerts">Alerts</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/modules">Modules</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/facilities">Facilities</Link>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
