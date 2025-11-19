import api from "./api";

export const getAssessments = () =>
  api.get("/assessments").then(res => res.data);

export const getAssessmentById = (id) =>
  api.get(`/assessments/${id}`).then(res => res.data);

export const getMyAttempts = () =>
  api.get("/assessments/my-attempts").then(res => res.data);

export const createAssessment = (data) =>
  api.post("/assessments", data).then(res => res.data);

export const submitAssessment = (id, data) =>
  api.post(`/assessments/${id}/submit`, data).then(res => res.data);

export const getAssessmentLeaderboard = (id) =>
  api.get(`/assessments/${id}/leaderboard`).then(res => res.data);

export const getAssessmentAttempts = (id) =>
  api.get(`/assessments/${id}/attempts`).then(res => res.data);

export const getUserAttemptsForAssessment = (id) =>
  api.get(`/assessments/${id}/my`).then(res => res.data);

