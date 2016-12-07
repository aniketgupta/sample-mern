import Schedule from '../models/schedule';
var schedule = new Schedule();
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

import jwt from "jsonwebtoken";
import serverConfig from '../config';


/**
 * Create a schedule
 * @param req
 * @param res
 * @returns void
 */
export function createSchedule(req, res) {

  console.log("reqbody:", req.body.createScheduleData.practiseTimings.monday[0].s1_start_time);

  if (!req.body.createScheduleData.practiseTimings || !req.body.createScheduleData.appointmentDuration) {
      res.status(403).json({
        success: false, 
        errorMessage: 'Please fill all the form fields.'
      });
  } else {

  const newSchedule = new Schedule({
      doctorID : 'abc@123',
      clinicID : 'bcx@122',
      practiseTimings : req.body.createScheduleData.practiseTimings,
      appointmentDuration : req.body.createScheduleData.appointmentDuration
    });

  // Let's sanitize inputs
  /*newUser.fname = sanitizeHtml(newUser.fname);
  newUser.lname = sanitizeHtml(newUser.lname);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.username = sanitizeHtml(newUser.username);
  newUser.password = sanitizeHtml(newUser.password);*/
   console.log("schedule", newSchedule);
    newSchedule.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ 
        success: true,
        createScheduleData: saved 
      });
    });
  }
}

/**
 * Get timeslots
 * @param req
 * @param res
 * @returns void
 */

export function getTimeSlots(req, res) {
  Schedule.find( {"_id" : "583d97ed3343e178b072d4ad"}, { "practiseTimings.monday" : 1, "appointmentDuration" : 1 } ).exec((err, timeslots) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ timeslots });
  });
}


