import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getWeatherByCity = async(req,res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: "city is required"});
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ message: "Weather API key not configured"});
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  
    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;

    const iconCode = data.weather?.[0]?.icon ?? "";
    const icon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;

    const windKph = typeof data.wind?.speed === "number" ? data.wind.speed * 3.6 : null;
    const rainfall = typeof data.rain?.["ih"] === "number" ? data.rain["1h"] : 0;
    
    return res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather?.[0]?.description ?? "",
      icon,
      humidity: data.main.humidity,
      wind_kph: windKph,
      rainfall,
      lat: data.coord?.lat,
      lon: data.coord?.lon,
      sunrise: data.sys?.sunrise ?? null,
      sunset: data.sys?.sunset ?? null,
      timezoneOffset: data.timezone ?? 0
    });

  } catch(err) {
    console.error("[DEBUGgetWeatherBy City] error:", message);
    return res.status(500).json({ message:"Failed to fetch weather from city api"});
  }
};

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

export { getWeatherByCity, getWeatherByCoords };