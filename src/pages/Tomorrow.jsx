import generateTomorrowSummary from "../utils/tomorrowSummary";

const Tomorrow = ({
  locationName,
  minTemp,
  maxTemp,
  description,
  humidity,
  windSpeed,
  rainChance,
  sunrise,
  sunset
}) => {
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

  return (
    <main className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 text-slate-100">
      <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Tomorrow at{" "}
          <span className="text=teal-300">
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
          <p className="text=xs uppercase tracking-wide text-slate-400">
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
            { rainChance }
            <span classname="text-sm">%</span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-700/80 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Humidity
          </p>
          <p className="mt-1 text-lg font-semibold">
            { humidity }
            <span classname="text-sm">%</span>
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