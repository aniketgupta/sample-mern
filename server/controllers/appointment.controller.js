import User from '../models/user';
import Appointment from '../models/appointment';
var appointment = new Appointment();
import Schedule from '../models/schedule';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
var _ = require('lodash');


// use lodash

/**
 * Get doctors
 * @param req
 * @param res
 * @returns void
 */

export function getDoctors(req, res) {
  /*var docID = Schedule.find({},{doctorID : 1, _id : 0}).populate('doctorID', 'fname lname ')
  docID.exec(function(err, data) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ data });
  });
}*/

  Schedule.find({},{doctorID : 1, _id : 0}).exec(function(err, data) {
    if(err) {
     res.status(500).send(err);
    } else {
      var docID = _.map(data, 'doctorID');
      console.log("docID", docID);
      User.find( {"_id": { $in : docID } }, { _id:1, fname: 1, lname: 1 } ).exec((err, data) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ data });
      });
    }
  });

  /*User.find( {"role" : "D"}, { _id:1, fname: 1, lname: 1 } ).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ data });
  });*/
}

export function getDoctorTimeSlots(req, res) {
  console.log("req", req.params.docID);
  Schedule.find( {doctorID : req.params.docID}, { "practiseTimings.monday" : 1, "appointmentDuration" : 1, doctorID: 1 } ).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(data)
    res.json({ data });
  });
}

/**
 * Create appointment
 * @param req
 * @param res
 * @returns void
 */
export function createAppointment(req, res) {

  console.log("reqbody:", req.body);

  if (!req.body.bookAppointmentData.time || !req.body.bookAppointmentData.docID) {
      res.status(403).json({
        success: false, 
        errorMessage: 'Please select all the fields.'
      });
  } else {

      Appointment.findOne({
        time: req.body.bookAppointmentData.time,
        docID : req.body.bookAppointmentData.docID
      }, function (err, result) {
          if (err) console.log(err);
          if (result) {
            res.status(403).json({
              success: false,
              errorMessage: 'Time Conflict: Already appointment is booked'
            });
          } else {
              const newAppointment = new Appointment({
              time : req.body.bookAppointmentData.time,
              docID : req.body.bookAppointmentData.docID
            });


           console.log("appointment", newAppointment);
            newAppointment.save((err, saved) => {
              if (err) {
                /*res.status(500).send(err);*/
                res.status(403).json({
                  success: false,
                  errorMessage: 'Internal Server Error.'
                });
              }
              /*res.json({ 
                success: true,
                createScheduleData: saved 
              });*/
              res.status(200).json({
                success: true,
                successMessage: "Appointment Booked.",
                createAppointmentData: saved 
              });
            });
          }
        });

    }
}
