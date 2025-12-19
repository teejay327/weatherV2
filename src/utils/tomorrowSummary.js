const isRealTime = (t) => typeof t === "string" && t.trim() && t.trim() !== "--";

const fmtTempRange = (minTemp, maxTemp) => {
  const hasMin = typeof minTemp === "number";
  const hasMax = typeof maxTemp === "number";

  if (hasMin && hasMax) return `with temperatures ranging from ${minTemp}°C to ${maxTemp}°C`;
  if (hasMax) return `with a high near ${maxTemp}°C`;
  if (hasMin) return `starting near ${minTemp}°C`;
  return ""; // no temperatures provided
};

const generateTomorrowSummary = ({
  locationName = "this location",
  minTemp,
  maxTemp,
  description = "partly cloudy",
  humidity,
  windSpeed,
  rainChance,
  sunrise = "--",
  sunset = "--"
} = {}) => {

  const parts = [];

  const tempPhrase = fmtTempRange(minTemp, maxTemp);
  if (tempPhrase) {
    parts.push(`Tomorrow at ${locationName} will be ${description}, ${tempPhrase}.`);
  } else {
    parts.push(`Tomorrow at ${locationName} will be ${description}.`);
  }

  if (typeof rainChance === "number") {
    if (rainChance >= 60) parts.push("Rain is likely at times.") 
    else if (rainChance >= 30) parts.push("Rain is possible, so have a backup plan.");
    else parts.push("Rain is unlikely the whole day.");
  }

  if (typeof humidity === "number") {
    if (humidity >= 75) parts.push("Humidity will be high, so it may feel a bit sticky" );
    else if (humidity >= 60) parts.push("Humidity will be noticeable, but still fairly comfortable.")
    else parts.push("You probably won't notice the humidty too much today.")
  }

  if (typeof windSpeed === "number") {
    if (windSpeed < 10) parts.push("Winds will be mainly light.");
    else if (windSpeed < 20) parts.push("The breeze should keep conditions pleasant.");
    else if (windSpeed < 30) parts.push("The breeze will feel fresh through out the day.")
      else parts.push("It's likely to be quite windy!");
  }

  if (isRealTime(sunrise) && isRealTime(sunset)) {
    parts.push(`Sunrise will be around ${sunrise} and set around ${sunset}.`);
  }

  if (typeof rainChance === "number") {
    if (rainChance >= 60) parts.push("The evening may be a little unsettled, with a possible storm.");
    else parts.push("The evening should be pleasant with little risk of storms.");
   }

   return parts.join(" ").replace(/\s+/g, " ").trim();
 };

export default generateTomorrowSummary;