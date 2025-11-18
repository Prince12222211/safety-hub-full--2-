import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, Building2, MapPin, Users as UsersIcon, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFacilities } from "../services/facilityService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createFacility } from "../services/facilityService";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "office",
    capacity: "",
    address: { street: "", city: "", state: "", zipCode: "", country: "India" },
    contactPerson: { name: "", phone: "", email: "" }
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      const data = await getFacilities();
      setFacilities(data || []);
    } catch (error) {
      console.error("Error loading facilities:", error);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createFacility({
        ...formData,
        capacity: parseInt(formData.capacity),
        isActive: true
      });
      toast({ title: "Success", description: "Facility created successfully" });
      setFormData({
        name: "",
        type: "office",
        capacity: "",
        address: { street: "", city: "", state: "", zipCode: "", country: "India" },
        contactPerson: { name: "", phone: "", email: "" }
      });
      setCreateDialogOpen(false);
      loadFacilities();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create facility",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDetails = (facility) => {
    setSelectedFacility(facility);
    setViewDialogOpen(true);
  };

  const totalCapacity = facilities.reduce((sum, f) => sum + (f.capacity || 0), 0);
  const getAddressString = (addr) => {
    if (typeof addr === 'string') return addr;
    return `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zipCode || ''}`.trim();
  };

  return (
    <DashboardLayout
      title={{
        en: "Facilities",
        hi: "सुविधाएं",
        pa: "ਸਹੂਲਤਾਂ",
      }}
    >
      <div className="space-y-6">
        <PageHeader
          title={{
            en: "Registered Facilities",
            hi: "पंजीकृत सुविधाएं",
            pa: "ਰਜਿਸਟਰਡ ਸਹੂਲਤਾਂ",
          }}
          description={{
            en: "Monitor critical infrastructure, capacities, and safety readiness across campuses.",
            hi: "कैंपस में महत्वपूर्ण अवसंरचना, क्षमता और सुरक्षा तत्परता की निगरानी करें।",
            pa: "ਕੈਂਪਸਾਂ ਵਿੱਚ ਮਹੱਤਵਪੂਰਣ ਬੁਨਿਆਦੀਆਂ ਢਾਂਚਿਆਂ, ਸਮਰੱਥਾ ਅਤੇ ਸੁਰੱਖਿਆ ਤਿਆਰੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।",
          }}
          badge={{
            en: "Facility intelligence",
            hi: "सुविधा इंटेलिजेंस",
            pa: "ਸਹੂਲਤ ਇੰਟੈਲੀਜੈਂਸ",
          }}
          icon={<Building2 className="h-6 w-6" />}
          actions={
            <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              <TranslatedText en="Add Facility" hi="सुविधा जोड़ें" pa="ਸਹੂਲਤ ਸ਼ਾਮਲ ਕਰੋ" />
            </Button>
          }
          highlights={[
            {
              label: { en: "Active Sites", hi: "सक्रिय स्थल", pa: "ਸਕਰੀਆ ਸਾਈਟਾਂ" },
              value: facilities.length.toString(),
              helper: "Across districts",
            },
            {
              label: { en: "Total Capacity", hi: "कुल क्षमता", pa: "ਕੁੱਲ ਸਮਰੱਥਾ" },
              value: totalCapacity.toLocaleString(),
              helper: "People supported",
            },
          ]}
        />

        {loading ? (
          <LoadingSpinner text="Loading facilities..." />
        ) : facilities.length === 0 ? (
          <Card className="glass-panel border-white/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Facilities</h3>
              <p className="text-sm text-muted-foreground">Add your first facility to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Card key={facility._id || facility.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{facility.name}</div>
                      <div className="text-sm text-muted-foreground font-normal mt-1 capitalize">
                        {facility.type}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{getAddressString(facility.address)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <UsersIcon className="h-4 w-4" />
                      <span>Capacity: {facility.capacity || 0}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => handleViewDetails(facility)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    <TranslatedText en="View Details" hi="विवरण देखें" pa="ਵੇਰਵੇ ਵੇਖੋ" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Facility Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Facility</DialogTitle>
            <DialogDescription>Register a new facility for safety monitoring</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Facility Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value }
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value }
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name</Label>
              <Input
                id="contactName"
                value={formData.contactPerson.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPerson: { ...formData.contactPerson, name: e.target.value }
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPerson.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, phone: e.target.value }
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactPerson.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, email: e.target.value }
                    })
                  }
                />
              </div>
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
                  "Create Facility"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Facility Details</DialogTitle>
          </DialogHeader>
          {selectedFacility && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-semibold">{selectedFacility.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Type</Label>
                <p className="capitalize">{selectedFacility.type}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p>{getAddressString(selectedFacility.address)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Capacity</Label>
                <p>{selectedFacility.capacity || 0} people</p>
              </div>
              {selectedFacility.contactPerson?.name && (
                <div>
                  <Label className="text-muted-foreground">Contact Person</Label>
                  <p>{selectedFacility.contactPerson.name}</p>
                  {selectedFacility.contactPerson.phone && (
                    <p className="text-sm text-muted-foreground">
                      Phone: {selectedFacility.contactPerson.phone}
                    </p>
                  )}
                  {selectedFacility.contactPerson.email && (
                    <p className="text-sm text-muted-foreground">
                      Email: {selectedFacility.contactPerson.email}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Facilities;
