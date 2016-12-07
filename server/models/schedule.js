import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt'

const scheduleSchema = new Schema({
  practiseTimings: { type: Object},
  "practiseTimings.$.monday": { type: [Object] },
  "practiseTimings.$.monday.$.s1_start_time": { type: String },
  "practiseTimings.$.monday.$.s1_end_time": { type: String },
  appointmentDuration: { type: Number, required: true },
  doctorID : { type: String, required: true },
  clinicID : { type: String, required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


export default mongoose.model('Schedule', scheduleSchema);
