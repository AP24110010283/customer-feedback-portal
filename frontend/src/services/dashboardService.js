import API from "./api";

export const getUserDashboard = () => {
  return API.get("/dashboard/user");
};

export const getAdminDashboard = () => {
  return API.get("/dashboard/admin");
};