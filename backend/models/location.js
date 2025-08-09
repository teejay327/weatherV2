import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  location: { type: String, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

export default mongoose.model('Location', locationSchema);