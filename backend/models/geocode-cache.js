import mongoose from 'mongoose';

const GeocodeCacheSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    default: 'openweather'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
    }
});

GeocodeCacheSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next;
});