import api from "./api";

export const getDrills = () =>
  api.get("/drills").then(res => res.data);

export const getDrillById = (id) =>
  api.get(`/drills/${id}`).then(res => res.data);

export const getUpcomingDrills = () =>
  api.get("/drills/upcoming").then(res => res.data);

export const createDrill = (data) =>
  api.post("/drills", data).then(res => res.data);

export const updateDrill = (id, data) =>
  api.put(`/drills/${id}`, data).then(res => res.data);

export const completeDrill = (id, results) =>
  api.post(`/drills/${id}/complete`, results).then(res => res.data);

