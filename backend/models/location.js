import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  location: { type: String, required: true},
  lat: { type: Number, required: true},
  lon: { type: Number, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

export default mongoose.model('Location', locationSchema);