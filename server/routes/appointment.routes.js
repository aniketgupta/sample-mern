import { Router } from 'express';
import * as AppointmentController from '../controllers/appointment.controller';
const router = new Router();

// Get doctors
router.route('/fetchDoctor').get(AppointmentController.getDoctors);
router.route('/fetchDoctor/:docID').get(AppointmentController.getDoctorTimeSlots);
//Create Appointment
router.route('/appointment/book').post(AppointmentController.createAppointment);

export default router;
