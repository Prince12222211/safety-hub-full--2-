import api from "./api";

export const createAlert = (data) =>
  api.post("/alerts", data).then(res => res.data);

export const getAlerts = () =>
  api.get("/alerts").then(res => res.data);
