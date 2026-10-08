import API from "./api.js";

export const register = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data; // Returns { success: true, message: "User registered successfully", data: user }
};

export const login = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data; 
};