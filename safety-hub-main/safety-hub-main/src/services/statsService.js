import api from "./api";

export const getAssessmentStats = () =>
  api.get("/stats/assessments").then(res => res.data);

export const getAlertStats = () =>
  api.get("/stats/alerts").then(res => res.data);

export const getReportStats = () =>
  api.get("/stats/reports").then(res => res.data);

export const getDrillStats = () =>
  api.get("/stats/drills").then(res => res.data);

export const getDashboardOverview = () =>
  api.get("/stats/overview").then(res => res.data);
