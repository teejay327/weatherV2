import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users-routes.js';
import locationRoutes from './routes/locations-routes.js';
import weatherRoutes from "./routes/weather-routes.js";

dotenv.config();
if (process.env.NODE_ENV !== "production") {
  console.log('[DEBUG] MONGODB_URI loaded!');
}

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
// app.use(cors());
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow server to server, curl, Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`),
        false
      );
    },
    credentials: true
  })
)

app.get("/", (req, res) => {
  res.send("WeatherLink API is live");
});


app.get("/health", (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

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
        console.log(`Server listening on port ${PORT}`);
      })
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });