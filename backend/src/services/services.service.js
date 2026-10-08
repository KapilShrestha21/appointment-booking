import { CREATE_SERVICES, DELETE_SERVICES, GET_ALL_SERVICES, GET_SERVICES_BY_ID, UPDATE_SERVICES } from "../queries/services.queries.js";
import AppError from "../utils/AppError.js";
import pool from "../config/db.js";

export const getServicesService = async () => {
  const { rows } = await pool.query(GET_ALL_SERVICES);
  return rows;
};

export const getServiceByIdService = async (id) => {
  const { rows } = await pool.query(GET_SERVICES_BY_ID, [id]);

  if (!rows[0]) {
    throw new AppError("Service not found", 404);
  }

  return rows[0];
};

export const createServicesService = async (serviceData) => {
  const { service_name, price, duration } = serviceData;
  const values = [service_name, price, duration];

  try {
    const { rows } = await pool.query(CREATE_SERVICES, values);

    if (!rows[0]) {
      throw new AppError("Failed to create service", 400);
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateServicesService = async (serviceData, id) => {
  const existingService = await getServiceByIdService(id);

  if (!existingService) {
    throw new AppError("Service not found", 404);
  }

  try {
    // Preserve existing values if omitted in request body
    const service_name = serviceData.service_name ?? existingService.service_name;
    const price = serviceData.price ?? existingService.price;
    const duration = serviceData.duration ?? existingService.duration;

    const values = [service_name, price, duration, id];

    const { rows } = await pool.query(UPDATE_SERVICES, values);

    if (!rows[0]) {
      throw new AppError("Failed to update service", 400);
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteServicesService = async (id) => {
  const { rows } = await pool.query(DELETE_SERVICES, [id]);

  if (!rows[0]) {
    throw new AppError("Service not found or could not be deleted", 404);
  }

  return rows[0];
};