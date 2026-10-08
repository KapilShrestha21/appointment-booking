import { CREATE_APPOINTMENT, GET_ALL_APPOINTMENT, GET_APPOINTMENT_BY_ID, UPDATE_APPOINTMENT, UPDATE_APPOINTMENT_STATUS, DELETE_APPOINTMENT} from "../queries/appointment.queries.js";

import pool from "../config/db.js";
import AppError from "../utils/AppError.js";

export const getAppointmentsService = async () => {
    const { rows } = await pool.query(GET_ALL_APPOINTMENT);

    return rows;
};

export const getAppointmentByIdService = async (id) => {
    const numericId = Number(id);

    if (!numericId || isNaN(numericId)) {
        throw new AppError(
            "Invalid appointment ID",
            400
        );
    }

    const { rows } = await pool.query(
        GET_APPOINTMENT_BY_ID,
        [numericId]
    );

    if (!rows[0]) {
        throw new AppError(
            "Appointment not found",
            404
        );
    }

    return rows[0];
};

export const createAppointmentService = async ( appointmentData) => {
    const { customer_name, customer_phone, service_id, appointment_date, appointment_time, notes } = appointmentData;

    const values = [
        customer_name,
        customer_phone,
        Number(service_id),
        appointment_date,
        appointment_time,
        notes || "",
    ];

    const { rows } = await pool.query(
        CREATE_APPOINTMENT,
        values
    );

    if (!rows[0]) {
        throw new AppError(
            "Failed to create appointment",
            400
        );
    }

    return rows[0];
};

export const updateAppointmentService = async (id, appointmentData) => {
    const numericId = Number(id);

    // Make sure appointment exists
    const existingAppointment = await getAppointmentByIdService(numericId);

    const customer_name = appointmentData.customer_name ?? existingAppointment.customer_name;

    const customer_phone = appointmentData.customer_phone ?? existingAppointment.customer_phone;

    const service_id = appointmentData.service_id !== undefined ? Number(appointmentData.service_id) : existingAppointment.service_id;

    const appointment_date = appointmentData.appointment_date ?? existingAppointment.appointment_date;

    const appointment_time = appointmentData.appointment_time ?? existingAppointment.appointment_time;

    const notes = appointmentData.notes ?? existingAppointment.notes;

    const values = [
        customer_name,
        customer_phone,
        service_id,
        appointment_date,
        appointment_time,
        notes,
        numericId,
    ];

    const { rows } = await pool.query(
        UPDATE_APPOINTMENT,
        values
    );

    if (!rows[0]) {
        throw new AppError(
            "Appointment update failed",
            500
        );
    }

    return rows[0];
};

export const updateAppointmentStatusService = async ( id, status) => {
    const numericId = Number(id);

    if (!numericId || isNaN(numericId)) {
        throw new AppError(
            "Invalid appointment ID",
            400
        );
    }

    const validStatuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
    ];

    if (!validStatuses.includes(status)) {
        throw new AppError(
            "Invalid appointment status",
            400
        );
    }

    // Get current appointment
    const existingAppointment = await getAppointmentByIdService(numericId);

    const currentStatus = existingAppointment.status;

    // Allowed status transitions
    const allowedTransitions = {
        pending: [
            "confirmed",
            "cancelled",
        ],

        confirmed: [
            "completed",
            "cancelled",
        ],

        completed: [],

        cancelled: [],
    };

    if (!allowedTransitions[currentStatus]?.includes(status)) {
        throw new AppError(
            `Cannot change status from ${currentStatus} to ${status}`,
            400
        );
    }

    const { rows } = await pool.query(
        UPDATE_APPOINTMENT_STATUS,
        [status, numericId]
    );

    if (!rows[0]) {
        throw new AppError(
            "Failed to update appointment status",
            500
        );
    }

    return rows[0];
};

export const deleteAppointmentService = async ( id ) => {
    const numericId = Number(id);

    if (!numericId || isNaN(numericId)) {
        throw new AppError(
            "Invalid appointment ID",
            400
        );
    }

    const { rows } = await pool.query(
        DELETE_APPOINTMENT,
        [numericId]
    );

    if (!rows[0]) {
        throw new AppError(
            "Appointment not found or already deleted",
            404
        );
    }

    return rows[0];
};