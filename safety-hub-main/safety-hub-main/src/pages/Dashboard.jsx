import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Award,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    {
      title: "Active Alerts",
      value: "12",
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Reports Submitted",
      value: "48",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Safety Incidents",
      value: "3",
      icon: AlertTriangle,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Training Progress",
      value: "85%",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const menuItems = [
    { label: "Dashboard", icon: "📊", href: "/dashboard" },
    { label: "Reports", icon: "📄", href: "/submit-report" },
    { label: "Alerts", icon: "🚨", href: "/alerts" },
    { label: "Modules", icon: "📚", href: "/modules" },
    { label: "Facilities", icon: "🏢", href: "/facilities" },
    { label: "Drills", icon: "🎯", href: "/drills" },
    { label: "Assessments", icon: "✅", href: "/assessments" },
    { label: "Users", icon: "👥", href: "/users" },
    { label: "Progress", icon: "📈", href: "/progress" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } shadow-lg z-40`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
            🛡️
          </div>
          {sidebarOpen && <span className="font-bold text-lg">Safety Hub</span>}
        </div>

        <nav className="mt-8 px-3 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-3 right-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user?.name || "User"}!
                </p>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  {user?.role || "User"}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.name || "U")?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      +5.2%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Submit Report
                  </span>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Report Alert
                  </span>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all">
                  <Award className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    View Training
                  </span>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    View Team
                  </span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    New Alert Created
                  </p>
                  <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    Report Submitted
                  </p>
                  <p className="text-xs text-gray-600 mt-1">4 hours ago</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    Training Completed
                  </p>
                  <p className="text-xs text-gray-600 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
