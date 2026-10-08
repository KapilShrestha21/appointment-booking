import catchAsync from "../utils/catchAsync.js";
import handleResponse from "../utils/handleResponse.js";

import {
    getAppointmentsService,
    getAppointmentByIdService,
    createAppointmentService,
    updateAppointmentService,
    updateAppointmentStatusService,
    deleteAppointmentService,
} from "../services/appointment.service.js";


export const getAppointments = catchAsync(async (req, res) => {
    const appointments = await getAppointmentsService();

    return handleResponse(
        res,
        200,
        "Appointments retrieved successfully",
        appointments
    );
});


export const getAppointmentById = catchAsync(async (req, res) => {
    const appointment = await getAppointmentByIdService(Number(req.params.id) );

    return handleResponse(
        res,
        200,
        "Appointment retrieved successfully",
        appointment
    );
});


export const createAppointment = catchAsync(async (req, res) => {
    const newAppointment = await createAppointmentService(req.body);

    return handleResponse(
        res,
        201,
        "Appointment created successfully",
        newAppointment
    );
});


export const updateAppointment = catchAsync(async (req, res) => {
    const updatedAppointment =
        await updateAppointmentService(
            Number(req.params.id),
            req.body
        );

    return handleResponse(
        res,
        200,
        "Appointment updated successfully",
        updatedAppointment
    );
});


export const updateAppointmentStatus = catchAsync(
    async (req, res) => {
        const updatedAppointment =
            await updateAppointmentStatusService(
                Number(req.params.id),
                req.body.status
            );

        return handleResponse(
            res,
            200,
            "Appointment status updated successfully",
            updatedAppointment
        );
    }
);


export const deleteAppointment = catchAsync(async (req, res) => {
    const deletedAppointment =
        await deleteAppointmentService(
            Number(req.params.id)
        );

    return handleResponse(
        res,
        200,
        "Appointment deleted successfully",
        deletedAppointment
    );
});