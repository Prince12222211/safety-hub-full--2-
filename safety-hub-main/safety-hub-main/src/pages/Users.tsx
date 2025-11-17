import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TranslatedText } from "@/components/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Mail, Shield } from "lucide-react";

const Users = () => {
  const users = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      role: "Administrator",
      department: "Safety Department",
      completedModules: 12,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      role: "Coordinator",
      department: "Training",
      completedModules: 8,
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@example.com",
      role: "Student",
      department: "Grade 10",
      completedModules: 5,
    },
  ];

  return (
    <DashboardLayout
      title={{
        en: "Users",
        hi: "उपयोगकर्ता",
        pa: "ਵਰਤੋਂਕਾਰ",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              <TranslatedText
                en="User Management"
                hi="उपयोगकर्ता प्रबंधन"
                pa="ਵਰਤੋਂਕਾਰ ਪ੍ਰਬੰਧਨ"
              />
            </h2>
            <p className="text-muted-foreground mt-1">
              <TranslatedText
                en="Manage users and their access"
                hi="उपयोगकर्ताओं और उनकी पहुंच प्रबंधित करें"
                pa="ਵਰਤੋਂਕਾਰਾਂ ਅਤੇ ਉਹਨਾਂ ਦੀ ਪਹੁੰਚ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ"
              />
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <TranslatedText
              en="Add User"
              hi="उपयोगकर्ता जोड़ें"
              pa="ਵਰਤੋਂਕਾਰ ਸ਼ਾਮਲ ਕਰੋ"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                          {user.role}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.department}
                      </p>
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
                      {user.completedModules}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      <TranslatedText
                        en="View Profile"
                        hi="प्रोफाइल देखें"
                        pa="ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ"
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
