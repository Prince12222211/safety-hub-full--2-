import Assessment from "../models/Assessment.js";
import Alert from "../models/Alert.js";
import Report from "../models/Report.js";
import Drill from "../models/Drill.js";

export const getAssessmentStats = async (req, res) => {
  try {
    const assessments = await Assessment.find({ isActive: true });
    const allAttempts = assessments.flatMap(a => a.attempts || []);

    const totalAssessments = assessments.length;
    const totalAttempts = allAttempts.length;
    const avgScore = totalAttempts > 0
      ? Math.round(allAttempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
      : 0;
    const passRate = totalAttempts > 0
      ? Math.round((allAttempts.filter(a => a.passed).length / totalAttempts) * 100)
      : 0;

    // Attempts by assessment
    const attemptsByAssessment = assessments.map(a => ({
      name: a.title,
      attempts: a.attempts?.length || 0,
      avgScore: a.attempts?.length ? Math.round(a.attempts.reduce((sum, att) => sum + att.score, 0) / a.attempts.length) : 0
    }));

    res.json({
      totalAssessments,
      totalAttempts,
      avgScore,
      passRate,
      attemptsByAssessment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlertStats = async (req, res) => {
  try {
    const alerts = await Alert.find();
    const severities = ['low', 'medium', 'high', 'critical'];
    const alertsByType = {};

    alerts.forEach(a => {
      const severity = a.severity || 'low';
      alertsByType[severity] = (alertsByType[severity] || 0) + 1;
    });

    const chartData = severities.map(sev => ({
      name: sev.charAt(0).toUpperCase() + sev.slice(1),
      value: alertsByType[sev] || 0,
      fill: sev === 'critical' ? '#dc2626' : sev === 'high' ? '#f97316' : sev === 'medium' ? '#eab308' : '#22c55e'
    }));

    res.json({
      total: alerts.length,
      byType: chartData,
      recentAlerts: alerts.slice(-5).reverse()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReportStats = async (req, res) => {
  try {
    const reports = await Report.find();
    const byPriority = {};
    const byStatus = {};

    reports.forEach(r => {
      const priority = r.priority || 'medium';
      const status = r.status || 'pending';
      byPriority[priority] = (byPriority[priority] || 0) + 1;
      byStatus[status] = (byStatus[status] || 0) + 1;
    });

    res.json({
      total: reports.length,
      byPriority,
      byStatus,
      recentReports: reports.slice(-5).reverse()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrillStats = async (req, res) => {
  try {
    const drills = await Drill.find();
    const completedDrills = drills.filter(d => d.status === 'completed').length;
    const totalParticipants = drills.reduce((sum, d) => sum + (d.participants?.length || 0), 0);
    const avgParticipation = drills.length > 0 ? Math.round(totalParticipants / drills.length) : 0;

    const drillsByType = {};
    drills.forEach(d => {
      const type = d.type || 'general';
      drillsByType[type] = (drillsByType[type] || 0) + 1;
    });

    res.json({
      totalDrills: drills.length,
      completedDrills,
      totalParticipants,
      avgParticipation,
      byType: drillsByType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardOverview = async (req, res) => {
  try {
    const [assessments, alerts, reports, drills] = await Promise.all([
      Assessment.find({ isActive: true }),
      Alert.find(),
      Report.find(),
      Drill.find()
    ]);

    const allAttempts = assessments.flatMap(a => a.attempts || []);
    const avgAssessmentScore = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((sum, a) => sum + a.score, 0) / allAttempts.length)
      : 0;

    res.json({
      assessmentSummary: {
        total: assessments.length,
        attempts: allAttempts.length,
        avgScore: avgAssessmentScore
      },
      alertSummary: {
        total: alerts.length,
        critical: alerts.filter(a => a.severity === 'critical').length,
        active: alerts.filter(a => a.active !== false).length
      },
      reportSummary: {
        total: reports.length,
        pending: reports.filter(r => r.status === 'pending').length,
        resolved: reports.filter(r => r.status === 'resolved').length
      },
      drillSummary: {
        total: drills.length,
        completed: drills.filter(d => d.status === 'completed').length,
        scheduled: drills.filter(d => d.status === 'scheduled').length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
