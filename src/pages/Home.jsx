import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Charts from './Charts';
import SevenDayForecast from './SevenDayForecast';
import MainNavigation from '../components/UI/MainNavigation';

const Home = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cities = ['Brisbane','Sydney','Melbourne','Hobart','Adelaide','Perth','Darwin'];
  const [weatherData, setWeatherData] = useState({});
  const showCharts = params.get('show') === 'charts';
  const showSevenDayForecast = params.get('show') === 'sevendayforecast';

  useEffect(() => {
    const fetchWeather = async() => {
      const updated = {};
      for (const city of cities) {
        try {
          const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
          const data = await res.json();
          updated[city] = {
            temp: data.temperature,
            condition: data.condition,
            icon: data.icon
          }
        } catch(err) {
          console.error(`Error fetching weather for ${city}:`, err);
          updated[city] = null;
        }
      }
      setWeatherData(updated);
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-weather-teal text-stone-200 mx-4 mb-4">
      <h1 className="text-2xl">Current temperature</h1>
      <hr className="w-20"/>
      <div>
        <ul>

          {cities.map((city) => (
            <li key={city} className="flex items-center gap-3">
              <span className="text-xl">{city}:</span>
              {weatherData[city] ? (
                <>
                  <span>{Math.floor(weatherData[city].temp)}° C</span>
                  <img 
                    src={`https:${weatherData[city].icon}`}
                    alt={weatherData[city].condition}
                    className="inline w-6 h-6"
                  />
                  <span className="text-xl">{weatherData[city].condition}</span>
                </>
              ) : (
                <span>loading ...</span>
              )}
            </li>
          ))}

          {/* <li><h2 className="my-2">Brisbane</h2></li>
          <li><h2 className="my-2">Sydney</h2></li>
          <li><h2 className="my-2">Melbourne</h2></li>
          <li><h2 className="my-2">Hobart</h2></li>
          <li><h2 className="my-2">Adelaide</h2></li>
          <li><h2 className="my-2">Perth</h2></li>
          <li><h2 className="my-2">Darwin</h2></li> */}
        </ul>
      </div>
      {showCharts && (
        <div className="mt-4">
          <Charts />
        </div>
      )}
      {showSevenDayForecast && (
        <div className="mt-4">
          <SevenDayForecast />
        </div>
      )}

    </div>
  )
}

export default Home;