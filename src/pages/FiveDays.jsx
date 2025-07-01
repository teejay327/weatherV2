import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const FiveDays = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const place = params.get('place') || 'Brisbane';
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = import.meta.env.WEATHER_API_KEY;

  useEffect(() => {
    const fetchForecast = async() => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${key}`
        );
        const data = await res.json();
        if (data.cod !== '200') throw new Error(data.message);

        
      } catch(err) {
        console.error('error retrieving the forecast', err);
        setError(err.message);
        setLoading(false);
      }
    }
  })

  return (
    <div className="bg-weather-teal text-stone-200 mb-4">
      <p className="text-2xl">5 day forecast</p>
    </div>
  )
}

export default FiveDays;