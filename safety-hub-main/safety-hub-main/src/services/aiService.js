import api from "./api";

export const suggestIncidentFields = (description) =>
  api
    .post("/ai/incident-suggest", { description })
    .then((res) => res.data);

