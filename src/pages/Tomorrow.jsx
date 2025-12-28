import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import generateTomorrowSummary from "../utils/tomorrowSummary";
import { apiUrl } from "../lib/api.js";

import ThermometerIcon from "../components/icons/Thermometer";
import RainIcon from "../components/icons/RainIcon";
import HumidityIcon from "../components/icons/HumidityIcon";
import SunriseIcon from "../components/icons/SunriseIcon";
import SunsetIcon from "../components/icons/SunsetIcon";
import WindIcon from "../components/icons/WindIcon";

const formatSunTime = (unixSeconds, timezoneOffsetSeconds = 0) => {
  if (!unixSeconds || typeof unixSeconds !== "number") return "--";
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("en-AU", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  });
};

const Tomorrow = () => {
  const location = useLocation();
  const params= new URLSearchParams(location.search);
  const place = params.get("place") || localStorage.getItem("lastPlace");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place) {
      setError("No location selected");
      setLoading(false);
      return;
    }

    const fetchTomorrow = async() => {
      try {
        setLoading(true);
        setError("");

        const cityRes = await axios.get(apiUrl("/api/weather/city"), {
          params: { city: place }
        });
        
        const cityWeather = cityRes.data; // e.g. { minTemp, maxTemp, humidity, ... }

        //Helpers
        const round = (n) => (typeof n === "number" ? Math.round(n) : null);
        const clampPercent = (n) => {
          return typeof n === "number" ? Math.max(0, Math.min(100, Math.round(n))) : null;
        }

        // Base values from backend (today)
        const tempNow = typeof cityWeather.temperature === "number" ? cityWeather.temperature : null;
        const humidityNow = typeof cityWeather.humidity === "number" ? cityWeather.humidity : null;
        const windNow = typeof cityWeather.wind_kph === "number" ? Math.round(cityWeather.wind_kph) : null;
        const rainfallNow = typeof cityWeather.rainfall === "number" ? cityWeather.rainfall : null;

        // pseudo tomorrow heuristics
        const pseudoMin = tempNow !== null ? round(tempNow - 3) : null;
        const pseudoMax = tempNow !== null ? round(tempNow + 2) : null;

        // description from humidity/wind/rainfall
        let pseudoDesc = "partly cloudy";
        if (rainfallNow !== null && rainfallNow > 1) pseudoDesc = "showers possible";
        else if (humidityNow !== null && humidityNow >= 75) pseudoDesc = "humid and partly cloudy";
        else if (windNow !== null && windNow >= 28) pseudoDesc = "breezy with broken clouds";
        else pseudoDesc = "mostly clear";

        // chance of rain
        let pseudoRainChance = null;
        if (rainfallNow !== null && rainfallNow > 1) pseudoRainChance  = 65;
        else if (humidityNow !== null && humidityNow >= 75) pseudoRainChance = 45;
        else if (humidityNow !== null && humidityNow >= 60) pseudoRainChance = 25;
        else if (humidityNow !== null) pseudoRainChance = 15;
        pseudoRainChance = clampPercent(pseudoRainChance);

        const lat = cityWeather.lat ?? cityWeather.latitude ?? cityWeather.coord?.lat;
        const lon = cityWeather.lon ?? cityWeather.longitude ?? cityWeather.coord?.lon;

        let sunriseStr = "--";
        let sunsetStr = "--";

        if (typeof lat === "number" && typeof lon === "number") {
          const coordsRes = await axios.get(apiUrl("/api/weather/coords"), 
            {params: { lat, lon }
          });


          const sunData = coordsRes.data;
          const timezoneOffset = typeof sunData.timezoneOffset === "number" ? sunData.timezoneOffset : 0;

          sunriseStr = formatSunTime(sunData.sunrise, timezoneOffset);
          sunsetStr = formatSunTime(sunData.sunset, timezoneOffset);
        }
        
        // set data that Tomorrow page expects
        setData({
          locationName: cityWeather.city || place,
          minTemp: pseudoMin ?? 18,
          maxTemp: pseudoMax ?? 26,
          description: pseudoDesc,
          humidity: humidityNow ?? null,
          windSpeed: windNow ?? null,
          rainChance: pseudoRainChance,
          sunrise: sunriseStr,
          sunset: sunsetStr
        });   
      } catch(err) {
        console.error(
          "Tomorrow fetch failed",
          err?.response?.status,
          err?.response?.data || err?.message);
        setError("failed to load tomorrow's forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchTomorrow();
  }, [place]);

  if (loading) {
    return (
      <main className="p-4 text-slate-100">
        <p>loading tomorrow&apos;s forecast ...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="p-4 text-slate-100">
        <p>{error || "No data available for tomorrow"}</p>
      </main>
    );
  }


const {
  locationName,
  minTemp,
  maxTemp,
  description,
  humidity,
  windSpeed,
  rainChance,
  sunrise,
  sunset
} = data;

  const summary = generateTomorrowSummary({
    locationName,
    minTemp,
    maxTemp,
    description,
    humidity,
    windSpeed,
    rainChance,
    sunrise,
    sunset
  });

  const displayPct = (v) => (typeof v === "number" ? `${v}%` : "--");

  return (
    <div className="bg-stone-800 text-slate-200 p-6 rounded-lg shadow-lg">
      <header className="mb-8">
        <h2 className="text-2xl mb-2">
          Tomorrow forecast for{" "}
          <span className="text-teal-500">
            {locationName || "your location"}
          </span>
        </h2>
        
        <p className="text-sm text-slate-300/80">
          A simple forecast to let you plan the day.
        </p>
      </header>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <aside className="md:col-span-1 space-y-4">
          <div 
            className="group bg-stone-600 text-stone-200 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <ThermometerIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200 
              group-hover:scale-110 group-hover:text-teal-200" />
            <p className="text-xs uppercase tracking-wide">Min / Max</p>
            <p className="text-lg mt-2">
              <span className="font-bold">{minTemp}</span> -{" "}
              <span className="font-bold">{maxTemp}°C</span>
            </p>
          </div>

          <div 
            className="group bg-stone-600 text-stone-200 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <RainIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200
              group-hover:scale-110 group-hover:text-teal-200" />
            <p className="text-xs uppercase tracking-wide opacity-80">Rain chance</p>
            <p className="text-lg mt-2 font-bold">{displayPct(rainChance)}</p>
          </div>

          <div
            className="group bg-stone-600 text-stone-200 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <HumidityIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200 
              group-hover:scale-110 group-hover:text-teal-200"/>
            <p className="text-xs uppercase tracking-wide opacity-80">Humidity</p>
            <p className="text-lg mt-2 font-bold">{displayPct(humidity)}</p>
          </div>

            
          <div 
            className="group bg-stone-600 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <WindIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200
              group-hover:scale-110 group-hover:text-teal-200"/>
            <p className="text-xs uppercase tracking-wide opacity-80">Wind</p>
            <p className="text-lg font-bold">{typeof windSpeed === "number" ? `${windSpeed} km/h` : "--"}</p>
          </div>

          <div
            className="group bg-stone-600 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <SunriseIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200
              group-hover:scale-110 group-hover:text-teal-200"/>
            <p className="text-xs uppercase tracking-wide opacity-80">Sunrise</p>
            <p className="text-lg mt-2 font-bold">{sunrise || "--"}</p>      
          </div>
            
          <div 
            className="group bg-stone-600 text-center rounded py-4 shadow transition-transform
              duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
            <SunsetIcon className="mx-auto mb-2 h-6 w-6 text-teal-300 transition-colors duration-200
              group-hover:scale-110 group-hover:text-teal-200"/>
            <p className="text-xs uppercase tracking-wide opacity-80">Sunset</p>
            <p className="text-lg mt-2 font-bold">{sunset || "--"}</p>
          </div>
        </aside>

        <section 
          className="group bg-stone-600/90 text-center rounded p-6 shadow transition-transform
            duration-200 hover:scale-[1.03] hover:shadow-xl md:col-span-2"
          >
          <span className="inline-block mb-2 text-xs px-2 py-1 rounded bg-stone-500/60 transition-colors
            duration-300 group-hover:bg-stone-400/60">
            Estimated forecast
          </span>
          <h3 className="text-lg font-semibold mb-3 text-center">The weather</h3>
          <p className="max-w-prose mx-auto text-sm md:text-base leading-relaxed text-left">
            { summary }
          </p>
        </section>
      </div>
    </div>
  )
};

export default Tomorrow;