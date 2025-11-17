import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/TranslatedText";
import { Plus, Calendar, MapPin, Users as UsersIcon } from "lucide-react";

const Drills = () => {
  const drills = [
    {
      id: 1,
      title: { en: "Fire Evacuation Drill", hi: "अग्नि निकासी अभ्यास", pa: "ਅੱਗ ਨਿਕਾਸ ਅਭਿਆਸ" },
      type: "Fire",
      date: "2024-12-19",
      time: "10:00 AM",
      facility: "Main Building",
      participants: 156,
      status: "scheduled",
    },
    {
      id: 2,
      title: { en: "Earthquake Safety Drill", hi: "भूकंप सुरक्षा अभ्यास", pa: "ਭੂਚਾਲ ਸੁਰੱਖਿਆ ਅਭਿਆਸ" },
      type: "Earthquake",
      date: "2024-12-20",
      time: "2:00 PM",
      facility: "School Campus",
      participants: 320,
      status: "scheduled",
    },
    {
      id: 3,
      title: { en: "Flood Response Drill", hi: "बाढ़ प्रतिक्रिया अभ्यास", pa: "ਹੜ੍ਹ ਜਵਾਬੀ ਅਭਿਆਸ" },
      type: "Flood",
      date: "2024-12-15",
      time: "9:00 AM",
      facility: "Community Center",
      participants: 180,
      status: "completed",
    },
  ];

  return (
    <DashboardLayout
      title={{
        en: "Emergency Drills",
        hi: "आपातकालीन अभ्यास",
        pa: "ਐਮਰਜੈਂਸੀ ਅਭਿਆਸ",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              <TranslatedText
                en="Safety Drills Schedule"
                hi="सुरक्षा अभ्यास कार्यक्रम"
                pa="ਸੁਰੱਖਿਆ ਅਭਿਆਸ ਸਮਾਂ-ਸਾਰਣੀ"
              />
            </h2>
            <p className="text-muted-foreground mt-1">
              <TranslatedText
                en="Plan and track emergency preparedness drills"
                hi="आपातकालीन तैयारी अभ्यास की योजना बनाएं और ट्रैक करें"
                pa="ਐਮਰਜੈਂਸੀ ਤਿਆਰੀ ਅਭਿਆਸਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਓ ਅਤੇ ਟਰੈਕ ਕਰੋ"
              />
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <TranslatedText
              en="Schedule Drill"
              hi="अभ्यास निर्धारित करें"
              pa="ਅਭਿਆਸ ਤਹਿ ਕਰੋ"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {drills.map((drill) => (
            <Card key={drill.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    <TranslatedText {...drill.title} />
                  </CardTitle>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      drill.status === "scheduled"
                        ? "bg-warning/20 text-warning"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {drill.status === "scheduled" ? (
                      <TranslatedText
                        en="Scheduled"
                        hi="निर्धारित"
                        pa="ਨਿਰਧਾਰਤ"
                      />
                    ) : (
                      <TranslatedText
                        en="Completed"
                        hi="पूर्ण"
                        pa="ਸੰਪੂਰਨ"
                      />
                    )}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {drill.date} at {drill.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{drill.facility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>{drill.participants} participants</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <TranslatedText
                      en="View Details"
                      hi="विवरण देखें"
                      pa="ਵੇਰਵੇ ਵੇਖੋ"
                    />
                  </Button>
                  {drill.status === "scheduled" && (
                    <Button variant="outline" size="sm">
                      <TranslatedText
                        en="Edit"
                        hi="संपादित करें"
                        pa="ਸੰਪਾਦਿਤ ਕਰੋ"
                      />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Drills;
