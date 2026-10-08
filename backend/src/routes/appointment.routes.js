import { Router } from "express";

import { getAppointments, getAppointmentById, createAppointment, updateAppointment, updateAppointmentStatus, deleteAppointment } from "../controllers/appointment.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { appointmentRegister, appointmentUpdate, appointmentStatusUpdate } from "../schemas/appointment.schema.js";

const router = Router();


router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post( "/", validate(appointmentRegister), createAppointment);
router.put("/:id",validate(appointmentUpdate),updateAppointment);
router.patch("/:id/status",validate(appointmentStatusUpdate),updateAppointmentStatus);
router.delete( "/:id", deleteAppointment);

export default router;