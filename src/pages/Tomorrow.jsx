import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import generateTomorrowSummary from "../utils/tomorrowSummary";

const Tomorrow = () => {
  const location = useLocation();
  const params= new URLSearchParams(location.search);
  const place = params.get("place");

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

       // Hope the api is correct!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const response = await axios.get("http://localhost:5000/api/weather", {
          params: { city: place }
        });

        
// 🔧 ADAPT this mapping to your actual response structure
        const d = response.data; // e.g. { minTemp, maxTemp, humidity, ... }

        //Helpers
        const round = (n) => (typeof n === "number" ? Math.round(n) : null);
        const clampPercent = (n) => {
          return typeof n === "number" ? Math.max(0, Math.min(100, Math.round(n))) : null;
        }

        // Base values from backend (today)
        const tempNow = typeof d.temperature === "number" ? d.temperature : null;
        const humidityNow = typeof d.humidity === "number" ? d.humidity : null;
        const windNow = typeof d.wind_kph === "number" ? d.wind_kph : null;
        const rainfallNow = typeof d.rainfall === "number" ? d.rainfall : null;

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
        else if (humidityNow !== null && humidityNow >= 60) pseudoRainChance = 25
        else if (humidityNow !== null) pseudoRainChance = 15;
        pseudoRainChance = clampPercent(pseudoRainChance);

        // set data that Tomorrow page expects
        setData({
          locationName: d.city || place,
          minTemp: pseudoMin ?? 18,
          maxTemp: pseudoMax ?? 26,
          description: pseudoDesc,
          humidity: humidityNow ?? null,
          windSpeed: windNow ?? null,
          rainChance: pseudoRainChance,
          sunrise: "--",
          sunset: "--"
        });   
      } catch(err) {
        console.error(err);
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
    <main className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 text-slate-100">
      <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Tomorrow at{" "}
          <span className="text-teal-300">
            {locationName || "your location"}
          </span>
        </h1>
        <p className="text-sm text-slate-300/80">
          A simple forecast to let you plan the day.
        </p>
      </header>

      <section className="rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-lg p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-3 text-slate-100">
          Tomorrow's story
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-200">
          { summary }
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Min / Max
          </p>
          <p className="mt-1 text-lg font-semibold">
            {minTemp}°C{" "}
            <span className="text-sm text-slate-400"> {maxTemp}°C</span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Rain chance
          </p>
          <p className="mt-1 text-lg font-semibold">
            {displayPct(rainChance)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Humidity
          </p>
          <p className="mt-1 text-lg font-semibold">
            {displayPct(humidity)}
            <span className="text-sm">%</span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Wind
          </p>
          <p className="mt-1 text-lg font-semibold">
            { windSpeed }
          <span className="text-sm"> km/h</span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Sunrise
          </p>
          <p className="mt-1 text-lg font-semibold">
            { sunrise }
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Sunset
          </p>
          <p className="mt-1 text-lg font-semibold">
            { sunset }
          </p>
        </div>
      </section>
    </main>
  )
};

export default Tomorrow;