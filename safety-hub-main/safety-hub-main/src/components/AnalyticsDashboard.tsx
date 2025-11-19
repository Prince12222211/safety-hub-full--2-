import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAssessmentStats, getAlertStats, getReportStats, getDrillStats, getDashboardOverview } from "@/services/statsService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AlertCircle, TrendingUp, CheckCircle2, Users } from "lucide-react";

const COLORS = ['#22c55e', '#eab308', '#f97316', '#dc2626'];

export const AnalyticsDashboard = () => {
  const [assessmentStats, setAssessmentStats] = useState(null);
  const [alertStats, setAlertStats] = useState(null);
  const [reportStats, setReportStats] = useState(null);
  const [drillStats, setDrillStats] = useState(null);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [aStats, alStats, rStats, dStats, ovStats] = await Promise.all([
        getAssessmentStats(),
        getAlertStats(),
        getReportStats(),
        getDrillStats(),
        getDashboardOverview()
      ]);
      setAssessmentStats(aStats);
      setAlertStats(alStats);
      setReportStats(rStats);
      setDrillStats(dStats);
      setOverview(ovStats);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading analytics..." />;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {overview && (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Assessment Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{overview.assessmentSummary.attempts}</div>
                <p className="text-xs text-blue-700 mt-1">Avg Score: {overview.assessmentSummary.avgScore}%</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-900">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{overview.alertSummary.active}</div>
                <p className="text-xs text-red-700 mt-1">Critical: {overview.alertSummary.critical}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-900">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{overview.reportSummary.total}</div>
                <p className="text-xs text-orange-700 mt-1">Pending: {overview.reportSummary.pending}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-green-900">Drills Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{overview.drillSummary.completed}</div>
                <p className="text-xs text-green-700 mt-1">Total: {overview.drillSummary.total}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessments by Score */}
        {assessmentStats && (
          <Card>
            <CardHeader>
              <CardTitle>Assessment Performance</CardTitle>
              <CardDescription>Average scores by assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assessmentStats.attemptsByAssessment}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Alerts by Severity */}
        {alertStats && (
          <Card>
            <CardHeader>
              <CardTitle>Alerts by Severity</CardTitle>
              <CardDescription>Distribution of alert levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={alertStats.byType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {alertStats.byType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Reports Summary */}
        {reportStats && (
          <Card>
            <CardHeader>
              <CardTitle>Reports Status</CardTitle>
              <CardDescription>Report breakdown by priority</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(reportStats.byPriority).map(([priority, count]: [string, unknown]) => {
                const countNum = count as number;
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="capitalize text-sm font-medium">{priority}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            priority === 'critical' ? 'bg-red-500' : priority === 'high' ? 'bg-orange-500' : priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(countNum / (reportStats.total as number)) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-8 text-right">{countNum}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Drills Stats */}
        {drillStats && (
          <Card>
            <CardHeader>
              <CardTitle>Drill Participation</CardTitle>
              <CardDescription>Drill metrics and participation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Completed Drills</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{drillStats.completedDrills}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Total Participants</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{drillStats.totalParticipants}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Avg per Drill</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">{drillStats.avgParticipation}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
