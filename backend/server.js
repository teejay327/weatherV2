import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());

app.get('/api/weather', async(req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'Please choose a city to get the forecast'})
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q:city,
          appid: API_KEY,
          units: 'metric'
        }
      }
    );

    const data = response.data;
    console.log("ICON CODE:", data.weather[0].icon);
    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      wind_kph: data.wind.speed
    });
  } catch (error) {
    console.error('API error for ${city}:', error.message);
    res.status(500).json({ error: 'Failed to retrieve weather data'});
  }
});

app.listen(PORT, () => {
  console.log(`Weather API proxy is running on http://localhost:${PORT}`);
})