import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt'


const appointmentSchema = new Schema({
  time: { type: String},
  docID : { type: String, required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


export default mongoose.model('Appointment', appointmentSchema);
