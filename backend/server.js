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
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    res.json({
      city,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      icon: response.data.current.condition.icon
    });
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve weather data'});
  }
});

app.listen(PORT, () => {
  console.log(`Weather API proxy is running on http://localhost:${PORT}`);
})