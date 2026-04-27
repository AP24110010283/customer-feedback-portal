import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Global 401 interceptor — clear stale auth on unauthorized responses
// NOTE: Do NOT hard-redirect here. Let AuthContext + ProtectedRoute
// handle the redirect through React state to avoid race conditions.
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(err);
  }
);

export default API;