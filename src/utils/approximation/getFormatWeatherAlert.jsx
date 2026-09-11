import { weatherHighlightLanguage } from "../../constants/Language/weatherHighlightLanguage";

export const getFormatWeatherAlert = (
  highlight,
  language
) => {
  let text =
    weatherHighlightLanguage?.[language]?.[highlight.key] ??
    weatherHighlightLanguage.EN[highlight.key];
  
  if (!text) return "";

  if (highlight.time) {
    text = text.replace("{time}", highlight.time);
  }

  return text;
};