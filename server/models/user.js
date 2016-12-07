import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  fname: { type: 'String', required: true },
  lname: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

//store the hash password before each save
userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//for comparing the password stored in db and the input pass.
userSchema.methods.comparePassword = function (passwrd, hash, cb) {
  bcrypt.compare(passwrd, hash, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

export default mongoose.model('User', userSchema);
