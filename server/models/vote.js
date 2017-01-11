import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  name: { type: 'String', required: true },
  votes: { type: 'Number', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


export default mongoose.model('Vote', voteSchema);
