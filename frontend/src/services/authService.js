import API from "./api";

// Register
export const register = (data) => {
  return API.post("/auth/register", data);
};

// Login
export const login = (data) => {
  return API.post("/auth/login", data);
};