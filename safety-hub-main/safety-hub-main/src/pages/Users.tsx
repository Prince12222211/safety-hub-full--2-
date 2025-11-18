import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Mail, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getUsers, createUser } from "../services/userService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createUser(formData);
      toast({ title: "Success", description: "User created successfully" });
      setFormData({ name: "", email: "", password: "", role: "user" });
      setCreateDialogOpen(false);
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.msg || error.response?.data?.message || "Failed to create user",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const adminCount = users.filter((user) => 
    user.role?.toLowerCase().includes("admin") || user.role?.toLowerCase() === "administrator"
  ).length;
  const averageModules = users.length > 0 
    ? Math.round(users.reduce((sum, user) => sum + (user.completedModules || 0), 0) / users.length)
    : 0;

  return (
    <DashboardLayout
      title={{
        en: "Users",
        hi: "उपयोगकर्ता",
        pa: "ਵਰਤੋਂਕਾਰ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "User Management",
            hi: "उपयोगकर्ता प्रबंधन",
            pa: "ਵਰਤੋਂਕਾਰ ਪ੍ਰਬੰਧਨ",
          }}
          description={{
            en: "Provision access, track training completion, and spotlight team champions.",
            hi: "एक्सेस प्रदान करें, प्रशिक्षण पूर्णता को ट्रैक करें और टीम चैंपियंस को उजागर करें।",
            pa: "ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰੋ, ਸਿਖਲਾਈ ਦੀ ਸੰਪੂਰਨਤਾ ਟਰੈਕ ਕਰੋ ਅਤੇ ਟੀਮ ਚੈਂਪੀਅਨਾਂ ਨੂੰ ਉਜਾਗਰ ਕਰੋ।",
          }}
          badge={{
            en: "People operations",
            hi: "पीपल ऑपरेशंस",
            pa: "ਪੀਪਲ ਓਪਰੇਸ਼ਨਜ਼",
          }}
          actions={
            <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              <TranslatedText en="Add User" hi="उपयोगकर्ता जोड़ें" pa="ਵਰਤੋਂਕਾਰ ਸ਼ਾਮਲ ਕਰੋ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Total profiles", hi: "कुल प्रोफ़ाइल", pa: "ਕੁੱਲ ਪ੍ਰੋਫ਼ਾਈਲਾਂ" },
              value: users.length.toString(),
              helper: "Faculty & learners",
            },
            {
              label: { en: "Admins & coordinators", hi: "प्रशासक एवं समन्वयक", pa: "ਐਡਮਿਨ ਅਤੇ ਕੋਆਰਡੀਨੇਟਰ" },
              value: adminCount.toString(),
              helper: "Trusted roles",
            },
            {
              label: { en: "Avg. modules", hi: "औसत मॉड्यूल", pa: "ਔਸਤ ਮੋਡੀਊਲ" },
              value: `${averageModules}+`,
              helper: "Per learner",
            },
          ]}
        />

        {loading ? (
          <LoadingSpinner text="Loading users..." />
        ) : users.length === 0 ? (
          <Card className="glass-panel border-white/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
              <p className="text-sm text-muted-foreground">Add your first user to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <Card key={user._id || user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {user.role || "user"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        <TranslatedText
                          en="Completed Modules"
                          hi="पूर्ण मॉड्यूल"
                          pa="ਸੰਪੂਰਨ ਮੋਡੀਊਲ"
                        />
                      </div>
                      <div className="text-2xl font-bold text-primary mt-1">
                        {user.completedModules || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
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
                  "Create User"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
