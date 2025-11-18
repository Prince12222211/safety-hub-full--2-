import api from "./api";

export const getFacilities = () =>
  api.get("/facilities").then(res => res.data);

export const getFacilityById = (id) =>
  api.get(`/facilities/${id}`).then(res => res.data);

export const createFacility = (data) =>
  api.post("/facilities", data).then(res => res.data);

export const updateFacility = (id, data) =>
  api.put(`/facilities/${id}`, data).then(res => res.data);

export const deleteFacility = (id) =>
  api.delete(`/facilities/${id}`).then(res => res.data);

