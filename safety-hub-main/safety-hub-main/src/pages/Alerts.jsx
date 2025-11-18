import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TranslatedText } from "@/components/TranslatedText";
import { Bell, AlertTriangle, Info, CheckCircle2, Clock, Filter, Plus, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data || []);
    } catch (error) {
      console.error("Error loading alerts:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "critical":
      case "emergency":
        return AlertTriangle;
      case "info":
      case "information":
        return Info;
      case "success":
        return CheckCircle2;
      default:
        return Bell;
    }
  };

  const getAlertVariant = (type) => {
    switch (type?.toLowerCase()) {
      case "critical":
      case "emergency":
        return "destructive";
      case "info":
      case "information":
        return "default";
      case "success":
        return "default";
      default:
        return "default";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    return alert.type?.toLowerCase() === filter.toLowerCase();
  });

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.type?.toLowerCase() === "critical" || a.type?.toLowerCase() === "emergency").length,
    info: alerts.filter((a) => a.type?.toLowerCase() === "info" || a.type?.toLowerCase() === "information").length,
  };

  return (
    <DashboardLayout
      title={{
        en: "Community Alerts",
        hi: "सामुदायिक चेतावनी",
        pa: "ਕਮਿਊਨਿਟੀ ਚੇਤਾਵਨੀ",
      }}
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              <TranslatedText
                en="Safety Alerts & Notifications"
                hi="सुरक्षा अलर्ट और सूचनाएं"
                pa="ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਸੂਚਨਾਵਾਂ"
              />
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <TranslatedText
                en="Stay informed about safety updates and emergency notifications"
                hi="सुरक्षा अपडेट और आपातकालीन सूचनाओं के बारे में सूचित रहें"
                pa="ਸੁਰੱਖਿਆ ਅਪਡੇਟਾਂ ਅਤੇ ਐਮਰਜੈਂਸੀ ਸੂਚਨਾਵਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਰੱਖੋ"
              />
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadAlerts} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <TranslatedText en="Refresh" hi="रिफ्रेश करें" pa="ਰਿਫਰੈਸ਼" />
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <TranslatedText en="New Alert" hi="नई चेतावनी" pa="ਨਵੀਂ ਚੇਤਾਵਨੀ" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="glass-panel border-white/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <TranslatedText en="Total Alerts" hi="कुल अलर्ट" pa="ਕੁੱਲ ਚੇਤਾਵਨੀਆਂ" />
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{alertStats.total}</p>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <TranslatedText en="Critical" hi="गंभीर" pa="ਗੰਭੀਰ" />
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-destructive">{alertStats.critical}</p>
                </div>
                <div className="rounded-2xl bg-destructive/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <TranslatedText en="Information" hi="जानकारी" pa="ਜਾਣਕਾਰੀ" />
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-primary">{alertStats.info}</p>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Info className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "critical", "info", "success"].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="rounded-full"
            >
              <Filter className="mr-2 h-3.5 w-3.5" />
              <TranslatedText
                en={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                hi={filterType === "all" ? "सभी" : filterType === "critical" ? "गंभीर" : filterType === "info" ? "जानकारी" : "सफल"}
                pa={filterType === "all" ? "ਸਾਰੇ" : filterType === "critical" ? "ਗੰਭੀਰ" : filterType === "info" ? "ਜਾਣਕਾਰੀ" : "ਸਫਲ"}
              />
            </Button>
          ))}
        </div>

        {/* Alerts List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredAlerts.length === 0 ? (
          <Card className="glass-panel border-white/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                <TranslatedText en="No Alerts" hi="कोई अलर्ट नहीं" pa="ਕੋਈ ਚੇਤਾਵਨੀ ਨਹੀਂ" />
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                <TranslatedText
                  en="There are no alerts to display at this time."
                  hi="इस समय प्रदर्शित करने के लिए कोई अलर्ट नहीं हैं।"
                  pa="ਇਸ ਸਮੇਂ ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ ਚੇਤਾਵਨੀਆਂ ਨਹੀਂ ਹਨ।"
                />
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              const variant = getAlertVariant(alert.type);
              const date = alert.createdAt ? new Date(alert.createdAt).toLocaleDateString() : "Recently";

              return (
                <motion.div
                  key={alert._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass-panel border-white/60 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`rounded-2xl p-3 ${
                            variant === "destructive" 
                              ? "bg-destructive/10" 
                              : "bg-primary/10"
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              variant === "destructive" 
                                ? "text-destructive" 
                                : "text-primary"
                            }`} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-lg">{alert.title || "Alert"}</CardTitle>
                              {alert.type && (
                                <Badge variant={variant === "destructive" ? "destructive" : "secondary"}>
                                  {alert.type}
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-base">
                              {alert.message || alert.description || "No description available."}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {date}
                              </div>
                              {alert.location && (
                                <div className="flex items-center gap-1.5">
                                  <span>{alert.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {alert.actions && (
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          {alert.actions.map((action, idx) => (
                            <Button key={idx} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
