import { weatherConditionKey, weatherConditionLanguage } from "../../constants/Language/weatherConditionLanguage";

export const getWeatherCondition = (code, language) => {
  const key = weatherConditionKey[code];

  return weatherConditionLanguage[language]?.[key] 
    || weatherConditionLanguage.EN[key]
    || "Unknown";
};
