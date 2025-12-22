import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getWeatherByCoords = async(req,res) => {
  try {
    const {lat,lon} = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({message: "latitude and longitude are required!"});
    }
      
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res 
        .status(500)
        .json({ message: "Weather API key not yet configured" })
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url, { timeout: 10000});
    const data = response.data;

    return res.status(200).json({
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      lat: data.coord?.lat,
      lon: data.coord?.lon,
      timezoneOffset: data.timezone
    })
    
  } catch(err) {
    console.error("[getWeatherByCoords] error:", err);
    return res.status(500).json({message: "Failed to fetch weather data"});
  }
}

export { getWeatherByCoords };