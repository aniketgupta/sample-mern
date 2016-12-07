import { Router } from 'express';
import * as ScheduleController from '../controllers/schedule.controller';
const router = new Router();

// Create a new schedule
router.route('/schedule/create').post(ScheduleController.createSchedule);
router.route('/schedule/view').get(ScheduleController.getTimeSlots);

export default router;
