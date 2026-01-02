import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/users-routes.js';
import locationRoutes from './routes/locations-routes.js';
import weatherRoutes from "./routes/weather-routes.js";

dotenv.config();
if (process.env.NODE_ENV !== "production") {
  console.log('[DEBUG] Loaded MONGODB_URI:', process.env.MONGODB_URI);
}

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("WeatherLink API is live");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
})

// routes
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/weather', weatherRoutes);

mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Weather API proxy is running on http://localhost:${PORT}`);
      })
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });