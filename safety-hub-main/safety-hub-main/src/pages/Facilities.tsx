import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, Building2, MapPin, Users as UsersIcon } from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      name: { en: "Main Building", hi: "मुख्य भवन", pa: "ਮੁੱਖ ਇਮਾਰਤ" },
      type: "Office",
      capacity: 500,
      address: "123 Safety Street, City Center",
      floors: 5,
    },
    {
      id: 2,
      name: { en: "School Campus", hi: "स्कूल कैंपस", pa: "ਸਕੂਲ ਕੈਂਪਸ" },
      type: "Educational",
      capacity: 1200,
      address: "456 Education Ave, North District",
      floors: 3,
    },
    {
      id: 3,
      name: { en: "Community Center", hi: "सामुदायिक केंद्र", pa: "ਕਮਿਊਨਿਟੀ ਸੈਂਟਰ" },
      type: "Public",
      capacity: 800,
      address: "789 Community Blvd, West Zone",
      floors: 2,
    },
  ];

  return (
    <DashboardLayout
      title={{
        en: "Facilities",
        hi: "सुविधाएं",
        pa: "ਸਹੂਲਤਾਂ",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              <TranslatedText
                en="Registered Facilities"
                hi="पंजीकृत सुविधाएं"
                pa="ਰਜਿਸਟਰਡ ਸਹੂਲਤਾਂ"
              />
            </h2>
            <p className="text-muted-foreground mt-1">
              <TranslatedText
                en="Manage facilities and their safety information"
                hi="सुविधाओं और उनकी सुरक्षा जानकारी प्रबंधित करें"
                pa="ਸਹੂਲਤਾਂ ਅਤੇ ਉਹਨਾਂ ਦੀ ਸੁਰੱਖਿਆ ਜਾਣਕਾਰੀ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ"
              />
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <TranslatedText
              en="Add Facility"
              hi="सुविधा जोड़ें"
              pa="ਸਹੂਲਤ ਸ਼ਾਮਲ ਕਰੋ"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      <TranslatedText {...facility.name} />
                    </div>
                    <div className="text-sm text-muted-foreground font-normal mt-1">
                      {facility.type}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{facility.address}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>
                      <TranslatedText
                        en="Capacity:"
                        hi="क्षमता:"
                        pa="ਸਮਰੱਥਾ:"
                      />{" "}
                      {facility.capacity}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <TranslatedText
                      en="Floors:"
                      hi="मंजिलें:"
                      pa="ਮੰਜ਼ਿਲਾਂ:"
                    />{" "}
                    {facility.floors}
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <TranslatedText
                    en="View Details"
                    hi="विवरण देखें"
                    pa="ਵੇਰਵੇ ਵੇਖੋ"
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Facilities;
