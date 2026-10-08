import catchAsync from "../utils/catchAsync.js";
import handleResponse from "../utils/handleResponse.js";

import { getServicesService, getServiceByIdService, createServicesService, updateServicesService,deleteServicesService } from "../services/services.service.js";

export const getServices = catchAsync(async (req, res) => {
  const services = await getServicesService();

  return handleResponse(res, 200, "Services fetched successfully", services);
});

export const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await getServiceByIdService(Number(id));

  return handleResponse(res, 200, "Service fetched successfully", service);
});

export const createService = catchAsync(async (req, res) => {
  const service = await createServicesService(req.body);

  return handleResponse(res, 201, "Service created successfully", service);
});

export const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedService = await updateServicesService(req.body, Number(id));

  return handleResponse(
    res,
    200,
    "Service updated successfully",
    updatedService
  );
});

export const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedService = await deleteServicesService(Number(id));

  return handleResponse(
    res,
    200,
    "Service deleted successfully",
    deletedService
  );
});