import API from "./api.js";

export const getAppointments = async () => {
  const response = await API.get("/appointments");
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await API.post("/appointments", appointmentData);
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await API.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await API.delete(`/appointments/${id}`);
  return response.data;
};