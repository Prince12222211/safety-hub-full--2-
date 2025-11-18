import api from "./api";

export const createAlert = (data) =>
  api.post("/alerts", data).then(res => res.data);

export const getAlerts = () =>
  api.get("/alerts").then(res => res.data);

export const updateAlert = (id, data) =>
  api.put(`/alerts/${id}`, data).then(res => res.data);

export const deleteAlert = (id) =>
  api.delete(`/alerts/${id}`).then(res => res.data);
