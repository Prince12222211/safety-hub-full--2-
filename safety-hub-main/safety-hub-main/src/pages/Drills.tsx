import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, Calendar, MapPin, Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getDrills, createDrill } from "../services/drillService";
import { getFacilities as fetchFacilities } from "../services/facilityService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";

const Drills = () => {
  const [drills, setDrills] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "fire",
    facility: "",
    scheduledDate: "",
    duration: "",
    description: "",
    objectives: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [drillsData, facilitiesData] = await Promise.all([
        getDrills(),
        fetchFacilities()
      ]);
      setDrills(drillsData || []);
      setFacilities(facilitiesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setDrills([]);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createDrill({
        ...formData,
        facility: formData.facility,
        scheduledDate: new Date(formData.scheduledDate),
        duration: parseInt(formData.duration),
        objectives: formData.objectives ? formData.objectives.split(',').map(o => o.trim()) : [],
        status: "scheduled"
      });
      toast({ title: "Success", description: "Drill scheduled successfully" });
      setFormData({
        title: "",
        type: "fire",
        facility: "",
        scheduledDate: "",
        duration: "",
        description: "",
        objectives: ""
      });
      setCreateDialogOpen(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create drill",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scheduledCount = drills.filter((d) => d.status === "scheduled").length;
  const completedCount = drills.filter((d) => d.status === "completed").length;
  const totalParticipants = drills.reduce((sum, d) => sum + (d.participants?.length || 0), 0);

  const getFacilityName = (facilityId) => {
    if (typeof facilityId === 'object' && facilityId?.name) return facilityId.name;
    const facility = facilities.find(f => f._id === facilityId);
    return facility?.name || "Unknown Facility";
  };

  return (
    <DashboardLayout
      title={{
        en: "Emergency Drills",
        hi: "आपातकालीन अभ्यास",
        pa: "ਐਮਰਜੈਂਸੀ ਅਭਿਆਸ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "Safety Drills Schedule",
            hi: "सुरक्षा अभ्यास कार्यक्रम",
            pa: "ਸੁਰੱਖਿਆ ਅਭਿਆਸ ਸਮਾਂ-ਸਾਰਣੀ",
          }}
          description={{
            en: "Plan, coordinate, and audit emergency preparedness activities across every facility.",
            hi: "प्रत्येक सुविधा में आपातकालीन तैयारी गतिविधियों की योजना, समन्वय और ऑडिट करें।",
            pa: "ਹਰ ਸਹੂਲਤ ਵਿੱਚ ਐਮਰਜੈਂਸੀ ਤਿਆਰੀ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀ ਯੋਜਨਾ, ਸਮਨਵਯ ਅਤੇ ਆਡਿਟ ਕਰੋ।",
          }}
          badge={{
            en: "Preparedness pipeline",
            hi: "तत्परता पाइपलाइन",
            pa: "ਤਿਆਰੀ ਪਾਈਪਲਾਈਨ",
          }}
          icon={<Calendar className="h-6 w-6" />}
          actions={
            <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              <TranslatedText en="Schedule Drill" hi="अभ्यास निर्धारित करें" pa="ਅਭਿਆਸ ਤਹਿ ਕਰੋ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Upcoming drills", hi: "आगामी अभ्यास", pa: "ਆਉਣ ਵਾਲੇ ਅਭਿਆਸ" },
              value: scheduledCount.toString(),
              helper: "Within next 30 days",
            },
            {
              label: { en: "Completed", hi: "पूर्ण", pa: "ਸੰਪੂਰਨ" },
              value: completedCount.toString(),
              helper: "Awaiting reports",
            },
            {
              label: { en: "Participants", hi: "प्रतिभागी", pa: "ਭਾਗੀਦਾਰ" },
              value: totalParticipants.toString(),
              helper: "Staff & students",
            },
          ]}
        />

        {loading ? (
          <LoadingSpinner text="Loading drills..." />
        ) : drills.length === 0 ? (
          <Card className="glass-panel border-white/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Drills Scheduled</h3>
              <p className="text-sm text-muted-foreground">Schedule your first drill to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {drills.map((drill) => {
              const scheduledDate = drill.scheduledDate ? new Date(drill.scheduledDate) : null;
              return (
                <Card key={drill._id || drill.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{drill.title}</CardTitle>
                      <Badge
                        variant={drill.status === "scheduled" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {drill.status || "scheduled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {scheduledDate
                            ? scheduledDate.toLocaleDateString() + " " + scheduledDate.toLocaleTimeString()
                            : "Not scheduled"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{getFacilityName(drill.facility)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UsersIcon className="h-4 w-4" />
                        <span>{drill.participants?.length || 0} participants</span>
                      </div>
                    </div>
                    {drill.description && (
                      <p className="text-sm text-muted-foreground mt-4">{drill.description}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Drill Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Drill</DialogTitle>
            <DialogDescription>Plan an emergency preparedness drill</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Drill Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Drill Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="evacuation">Evacuation</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="lockdown">Lockdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="facility">Facility *</Label>
              <Select
                value={formData.facility}
                onValueChange={(value) => setFormData({ ...formData, facility: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility._id} value={facility._id}>
                      {facility.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date & Time *</Label>
              <Input
                id="scheduledDate"
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objectives">Objectives (comma-separated)</Label>
              <Input
                id="objectives"
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                placeholder="e.g., Test evacuation routes, Check response time"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || !formData.facility}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule Drill"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Drills;
