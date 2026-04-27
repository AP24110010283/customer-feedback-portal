import API from "./api";

// Get Feedback
export const getFeedback = () => {
  return API.get("/feedback");
};

// Create Feedback
export const createFeedback = (data) => {
  return API.post("/feedback", data);
};

// Update Feedback
export const updateFeedback = (id, data) => {
  return API.put(`/feedback/${id}`, data);
};

// Delete Feedback
export const deleteFeedback = (id) => {
  return API.delete(`/feedback/${id}`);
};