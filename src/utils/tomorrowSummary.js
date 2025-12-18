const generateTomorrowSummary = ({
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
  if (!locationName) return "";

  // const safeDescription = description.toLowerCase();

  // const hasMin = typeof minTemp === "number";
  // const hasMax = typeof maxTemp === "number";

  // const startSentence = hasMin && hasMax 
  //   ? `Tomorrow at ${locationName} will be ${safeDescription} with temperatures ranging from ${minTemp}°C to ${maxTemp}°C.`
  //   : `Tomorrow at ${locationName} will be ${safeDescription}.`;


  const rainLikelihood = 
    typeof rainChance === "number" 
      ? rainChance >= 60 
        ? "likely"
        : rainChance >= 30 
        ? "possible"
        : "unlikely"
      : "unlikely";
  
  const comfortLevel =
    typeof humidity === "number"
      ? humidity >= 75
        ? "sticky"
        : humidity >= 60
        ? "a bit humid"
        : "comfortable"
      : "comfortable";

  const windFeel =
    typeof windSpeed === "number"
      ? windSpeed >= 25
        ? "breezy"
        : windSpeed >= 10
        ? "light to moderate"
        : "light"
      : "light"
     
  const eveningFeel =
    rainChance >= 50
      ? "a little unsettled"
      : "pleasant"

  const stormRisk =
    rainChance >= 60
      ? "a slight risk of storms"
      : "very little risk of storms";

  // const finalSentence = `Sunrise will be at around ${sunrise} and sunset around ${sunset}.`;

  return `
    Tomorrow at ${locationName} will be ${description}, with temperatures ranging from ${minTemp}
    to ${maxTemp}. Rain is ${rainLikelihood}, and humidity levels may make it ${comfortLevel}.
    Winds will be ${windFeel}, which should make conditions comfortable, particularly near
    the coast. Sunrise will be at around ${sunrise || "--"} and sunset around ${sunset || "--"}.
    The evening should be ${eveningFeel}, with ${stormRisk}.`
    .replace(Boolean)
    .trim();
};

export default generateTomorrowSummary;