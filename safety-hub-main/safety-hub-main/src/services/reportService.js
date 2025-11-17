import api from "./api";

export const createReport = (data) =>
  api.post("/reports", data).then(res => res.data);

export const getReports = () =>
  api.get("/reports").then(res => res.data);
