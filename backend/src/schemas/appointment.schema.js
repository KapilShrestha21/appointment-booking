import { z } from "zod";

const appointmentBodySchema = z.object({
    customer_name: z
        .string()
        .trim()
        .min(1, "Customer name is required"),

    customer_phone: z
        .string()
        .trim()
        .min(7, "Valid phone number required"),

    service_id: z
        .coerce
        .number()
        .positive("Service is required"),

    appointment_date: z
        .string()
        .min(1, "Appointment date is required"),

    appointment_time: z
        .string()
        .min(1, "Appointment time is required"),

    notes: z
        .string()
        .trim()
        .optional()
        .nullable()
        .default(""),
});

// POST /appointments
export const appointmentRegister = appointmentBodySchema;

// PUT /appointments/:id
export const appointmentUpdate = appointmentBodySchema.partial();

// PATCH /appointments/:id/status
export const appointmentStatusUpdate = z.object({
    status: z.enum(
        ["pending", "confirmed", "completed", "cancelled"],
        {
            message: "Invalid appointment status",
        }
    ),
});