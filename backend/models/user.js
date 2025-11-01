import mongoose from 'mongoose';
//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;