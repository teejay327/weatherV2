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

  const startSentence = `Tomorrow at ${locationName} will be ${description.toLowerCase()} with temperatures ranging from ${minTemp}°C to ${maxTemp}°C.`

  let tempSentence = "";
  if (maxTemp >= 30) {
    tempSentence = `The afternoon will feel hot reaching up to ${maxTemp}.`
  } else if (maxTemp<= 18) {
    tempSentence = `It will stay on the cooler side throughout the day.`
  } else {
    tempSentence = `The temperature should remain comfortable for most of the day.`;
  }
    
  let rainSentence = "";
  if (rainChance >= 60) {
    rainSentence = `There is a strong chance of showers, so take an umbrella!`
  } else if (rainChance < 30) {
    rainSentence = `Rain is unlikely, making it a great day for outdoor fun!`;
  } else {
    rainSentence = `A few light showers are possible in the afternoon or evening.`
  }

  let windSentence = "";
   if (windSpeed >= 30) {
    windSentence = `Winds will be quite strong, so conditions may feel gusty at times.`
  } else if (windSpeed < 15) {
    windSentence = `Winds should stay light, keeping conditions calm.`
  } else {
    windSentence = `Expect a gentle to moderate breeze throughout the day.`
  } 
  let finalSentence = `Sunrise will be at approximately ${sunrise} and sunset will be at approximately ${sunset}`;

  return [
    startSentence, 
    tempSentence,
    rainSentence,
    windSentence,
    finalSentence
  ].join(" ");
}

export default generateTomorrowSummary;