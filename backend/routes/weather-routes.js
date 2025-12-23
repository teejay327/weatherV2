import express from 'express';
import { getWeatherByCity, getWeatherByCoords } from "../controllers/weather-controller.js";

const router = express.Router();

router.get("/", getWeatherByCity);
router.get("/city", getWeatherByCity);
router.get("/coords", getWeatherByCoords);

export default router;