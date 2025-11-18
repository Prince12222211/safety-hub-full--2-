import api from "./api";

export const getModules = () =>
  api.get("/modules").then(res => res.data);

export const getModuleById = (id) =>
  api.get(`/modules/${id}`).then(res => res.data);

export const getMyModules = () =>
  api.get("/modules/my-modules").then(res => res.data);

export const createModule = (data) =>
  api.post("/modules", data).then(res => res.data);

export const enrollModule = (id) =>
  api.post(`/modules/${id}/enroll`).then(res => res.data);

export const completeModule = (id) =>
  api.post(`/modules/${id}/complete`).then(res => res.data);

