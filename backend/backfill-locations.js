// backfill-locations.js
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Location from './models/location.js'; // adjust path if models/ is in a different folder

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const docs = await Location.find({ $or: [{ lat: { $exists: false } }, { lon: { $exists: false } }] });
    console.log(`⚓ Found ${docs.length} locations missing lat/lon`);

    for (const d of docs) {
      try {
        const q = encodeURIComponent(d.location);
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
        const geoRes = await axios.get(geoUrl);

        if (geoRes.data.length > 0) {
          const { lat, lon } = geoRes.data[0];
          d.lat = lat;
          d.lon = lon;
          await d.save();
          console.log(`🛠️ Backfilled ${d._id}: ${d.location} → (${lat}, ${lon})`);
        } else {
          console.warn(`⚠️ No geocode result for ${d.location}`);
        }
      } catch (err) {
        console.error(`❌ Failed for ${d.location}:`, err.message);
      }
    }

    console.log('🎉 Backfill complete');
    await mongoose.disconnect();
  } catch (err) {
    console.error('🚨 Error during backfill:', err);
    process.exit(1);
  }
};

run();
