import express from 'express';
import { getWeatherByCity, getWeatherByCoords, getFiveDayForecastByCity } from "../controllers/weather-controller.js";

const router = express.Router();

router.get("/", getWeatherByCity);
router.get("/city", getWeatherByCity);
router.get("/coords", getWeatherByCoords);
router.get("/forecast", getFiveDayForecastByCity)

export default router;