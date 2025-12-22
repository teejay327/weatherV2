import express from 'express';
import { getWeatherByCoords } from "../controllers/weather-controller.js";

const router = express.Router();

router.get("/", getWeatherByCoords);

export default router;