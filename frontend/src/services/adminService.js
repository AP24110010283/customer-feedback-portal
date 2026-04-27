import API from "./api";

export const updateFeatureStatus = (id, status) => {
  return API.put(`/admin/feature/${id}`, { status });
};