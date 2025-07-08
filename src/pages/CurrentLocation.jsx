import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DisplayDate from '../components/shared/util/DisplayDate.jsx';
import Charts from '../pages/Charts.jsx';
import FiveDays from '../pages/FiveDays.jsx';

const CurrentLocation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const place = params.get('place');
  const show = params.get('show');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async() => {
      try {
        const res = await fetch(`http://localhost:5000/api/weather?city=${place}`);
        const data = await res.json();
        setWeather(data);
        console.log('Received weather data:', data);
      } catch(err) {
        console.error('Unable to fetch weather for current location:', err);
      }
    };
    if (place) fetchWeather();
  }, [place]);

  if (!weather) return <p className="text-stone-200 p-4">loading weather ...</p>;

  return (
    <div className="bg-weather-teal-offset text-stone-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-2">Today's forecast for {weather.city}</h2>
      <DisplayDate />
      <div className="mt-4 space-y-2">
        <p>Current temperature: {Math.floor(weather.temperature)}°C</p>
        <p>Humidity: {weather.humidity ?? '--'}%</p>
        <p>Rainfall (last 3 hours): {weather.rainfall ?? '0'}mm</p>
        <p>Wind: <span>{weather.wind_kph ? `${Math.floor(weather.wind_kph)} km/h` : '--'} </span>
        {' '}
        <span className="ml-1 text-sm">({weather.wind_dir ?? '--'})</span>
        </p>
      </div>
 
      <div className="mt-8">
        {show === 'charts' && <Charts />}
        {show === 'fivedays' && <FiveDays />}
      </div>
    </div>
  )
}

export default CurrentLocation;