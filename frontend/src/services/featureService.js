import API from "./api";

// Get Features
export const getFeatures = () => {
  return API.get("/features");
};

// Create Feature
export const createFeature = (data) => {
  return API.post("/features", data);
};

// Update Feature
export const updateFeature = (id, data) => {
  return API.put(`/features/${id}`, data);
};

// Delete Feature
export const deleteFeature = (id) => {
  return API.delete(`/features/${id}`);
};

// Upvote Feature
export const upvoteFeature = (id) => {
  return API.post(`/votes/${id}`);
};