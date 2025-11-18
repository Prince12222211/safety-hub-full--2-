import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, BookOpen, Clock, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { getModules, createModule } from "../services/moduleService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Modules = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "earthquake",
    difficulty: "beginner",
    duration: "",
    youtubeLink: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setLoading(true);
      const data = await getModules();
      setModules(data || []);
    } catch (error) {
      console.error("Error loading modules:", error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createModule({
        ...formData,
        duration: parseInt(formData.duration),
        isActive: true
      });
      toast({ title: "Success", description: "Module created successfully" });
      setFormData({
        title: "",
        description: "",
        category: "earthquake",
        difficulty: "beginner",
        duration: "",
        youtubeLink: ""
      });
      setCreateDialogOpen(false);
      loadModules();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create module",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalDuration = modules.reduce((sum, module) => sum + (module.duration || 0), 0);
  const totalEnrolled = modules.reduce((sum, module) => sum + (module.enrolledUsers?.length || 0), 0);

  return (
    <DashboardLayout
      title={{
        en: "Training Modules",
        hi: "प्रशिक्षण मॉड्यूल",
        pa: "ਸਿਖਲਾਈ ਮੋਡੀਊਲ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "All Training Modules",
            hi: "सभी प्रशिक्षण मॉड्यूल",
            pa: "ਸਾਰੇ ਸਿਖਲਾਈ ਮੋਡੀਊਲ",
          }}
          description={{
            en: "Browse, launch, and optimize disaster readiness learning experiences.",
            hi: "आपदा तैयारी सीखने के अनुभवों को ब्राउज़ करें, लॉन्च करें और बेहतर बनाएं।",
            pa: "ਆਫ਼ਤ ਤਿਆਰੀ ਸਿੱਖਣ ਦੇ ਅਨੁਭਵਾਂ ਨੂੰ ਬ੍ਰਾਊਜ਼, ਸ਼ੁਰੂ ਅਤੇ ਸੁਧਾਰੋ।",
          }}
          badge={{
            en: "Learning hub",
            hi: "लर्निंग हब",
            pa: "ਲਰਨਿੰਗ ਹੱਬ",
          }}
          icon={<BookOpen className="h-6 w-6" />}
          actions={
            <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              <TranslatedText en="Create Module" hi="मॉड्यूल बनाएं" pa="ਮੋਡੀਊਲ ਬਣਾਓ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Published Modules", hi: "प्रकाशित मॉड्यूल", pa: "ਪ੍ਰਕਾਸ਼ਿਤ ਮੋਡੀਊਲ" },
              value: modules.length.toString(),
              helper: "Grouped by hazard type",
            },
            {
              label: { en: "Total Learners", hi: "कुल शिक्षार्थी", pa: "ਕੁਲ ਸਿੱਖਣ ਵਾਲੇ" },
              value: totalEnrolled.toString(),
              helper: "Active enrolments",
            },
            {
              label: { en: "Avg. Duration", hi: "औसत अवधि", pa: "ਔਸਤ ਅਵਧੀ" },
              value: modules.length > 0 ? `${Math.round(totalDuration / modules.length)} min` : "0 min",
              helper: "Per learning path",
            },
          ]}
        />

        {loading ? (
          <LoadingSpinner text="Loading modules..." />
        ) : modules.length === 0 ? (
          <Card className="glass-panel border-white/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Modules Available</h3>
              <p className="text-sm text-muted-foreground">Create your first training module to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module._id || module.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {module.difficulty || "beginner"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration || 0} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{module.enrolledUsers?.length || 0} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span className="capitalize">{module.category || module.type}</span>
                    </div>
                  </div>
                  {module.youtubeLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => window.open(module.youtubeLink, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Watch on YouTube
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Module Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Module</DialogTitle>
            <DialogDescription>Add a new training module with YouTube content</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Module Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="cyclone">Cyclone</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <Label htmlFor="youtubeLink">YouTube Link</Label>
              <Input
                id="youtubeLink"
                type="url"
                value={formData.youtubeLink}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground">
                Enter a YouTube video or channel link for this module
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Module"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Modules;
