import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  location: { type: String, required: true},
  lat: { type: Number, required: true},
  lon: { type: Number, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema)

export default Location;