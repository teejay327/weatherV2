const generateTomorrowSummary = ({
  locationName = 'this location',
  minTemp = null,
  maxTemp = null,
  description = "partly cloudy",
  humidity = null,
  windSpeed = null,
  rainChance = null,
  sunrise = "a typical sunrise time",
  sunset = "a typical sunset time"
} = {}) => {

  const safeDescription = description.toLowerCase();

  const hasMin = typeof minTemp === "number";
  const hasMax = typeof maxTemp === "number";

  const startSentence = hasMin && hasMax 
    ? `Tomorrow at ${locationName} will be ${safeDescription} with temperatures ranging from ${minTemp}°C to ${maxTemp}°C.`
    : `Tomorrow at ${locationName} will be ${safeDescription}.`;

  // let tempSentence = "";
  // if (maxTemp >= 30) {
  //   tempSentence = `The afternoon will feel hot reaching up to ${maxTemp}°C.`
  // } else if (maxTemp<= 18) {
  //   tempSentence = `It will stay on the cooler side throughout the day.`
  // } else {
  //   tempSentence = `The temperature should remain comfortable for most of the day.`;
    
  let rainSentence = "";
  if (typeof rainSentence === "number") {
    if (rainChance >= 60) {
      rainSentence = `There is a strong chance of showers, so take an umbrella!`
    } else if (rainChance < 20) {
      rainSentence = `Rain is unlikely, making it a great day for outdoor fun!`;
    } else {
      rainSentence = `A few light showers are possible in the afternoon or evening.`
    }
  }

  let windSentence = "";
  if (typeof windSentence === "number") {
    if (windSpeed >= 30) {
      windSentence = `Winds will be quite strong, so conditions may feel gusty at times.`
    } else if (windSpeed <= 10) {
      windSentence = `Winds should stay light, keeping conditions calm.`
    } else {
      windSentence = `Expect a gentle to moderate breeze throughout the day.`
    } 
  }

  let humiditySentence = "";
  if (typeof humidity === "number") {
    if (humidity > 70) {
      humiditySentence = `It will feel sticky.`
    } else if (humidity <= 40) {
      humiditySentence = `The air should be dry and pleasant.`
    } else {
      humiditySentence = `It could feel a bit humid.`
    }
  }

  const finalSentence = `Sunrise will be at around ${sunrise} and sunset around ${sunset}.`;

  return [
    startSentence, 
    rainSentence,
    windSentence,
    humiditySentence,
    finalSentence
  ]
    .filter(Boolean)
    .join(" ");
};

export default generateTomorrowSummary;