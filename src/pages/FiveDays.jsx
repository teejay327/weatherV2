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
  const key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchForecast = async() => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${key}`
        );
        const data = await res.json();
        console.log('[DEBUG] VITE API key:', import.meta.env.VITE_WEATHER_API_KEY);
        console.log('[DEBUG] API key:', import.meta.env.WEATHER_API_KEY );
        if (data.cod !== '200') throw new Error(data.message);

        // Group forecast into days
        const grouped = {};
        data.list.forEach(entry => {
          const date = entry.dt_txt.split(' ')[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(entry);
        });

        const daily = Object.entries(grouped).slice(0,5).map(([date,entries]) => {
          const descriptions = entries.map(e => e.weather[0].description);
          const min = Math.min(...entries.map(e = e.main.temp_min));
          const max = Math.max(...entries.map(e => e.main.temp_max));
          const rainChances = entries.map(e => e.pop); // pop = probability of precipitation (0-1)
          const totalRain = entries.reduce((acc,e) => {
            acc + (e.rain?.['3h'] || 0)
          },0)

          return {
            date: format(new Date(date), 'EEEE, d MMMM'),
            description: descriptions[Math.floor(descriptions.length/2)],
            minTemp: min.toFixed(1),
            maxtemp: max.toFixed(1),
            rainChance: math.round(Math.max(...rainChances) * 100),
            rainAmount: totalRain.toFixed(1)
          };
        });

        setForecastData(daily);
        setLoading(false);
      } catch(err) {
        console.error('error retrieving the forecast', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (place) fetchForecast();
  }, [place]);

  if (loading) return <p className="text-stone-200 p-4">Loading 5-day forecast ...</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error} </p>;

  return (
    <div className="bg-weather-teal text-stone-200 mb-4">
      <h2 className="text-2xl font-bold mb-4">5 day forecast for {place}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md_grid-cols-3 gap-4'>
        {forecastData.map((day,index) => {
          <div key={index} clasName="bg-stone-800 p-4 rounded shadow">
            <p className="font-semibold text-lg">{day.date}</p>
            <p className="capitalize text-stone-200 text-sm">{day.description}</p>
            <p>Min: {day.minTemp}°C</p>
            <p>Max: {day.maxTemp}°C</p>
            <p>Chance of rain: {day.rainChance}%</p>
            <p>Rainfall: {day.rainAmount}mm</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default FiveDays;