export const formatTime12h = (isoString) => {
  if (!isoString) return "--:--";
  const date = new Date(
    isoString.includes("T") ? isoString : `2026-09-05T${isoString}`,
  );
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getDailyAdvice = (item) => {
  if (!item)
    return { advice: "Evaluate local field conditions.", bestTime: "Morning" };

  if (item.weatherCode >= 95) {
    return {
      advice:
        "Thunderstorm & heavy rain likely. Secure farm netting, clear field drainage channels, and protect cut harvest.",
      bestTime: "Pre-storm inspection",
    };
  }
  if (item.rainProbability >= 70 || item.precipitation >= 2) {
    return {
      advice:
        "High rainfall expected. Postpone chemical spraying & fertilizer application to avoid washout.",
      bestTime: "Indoor farm maintenance",
    };
  }
  if (item.windSpeed >= 18 || item.windGusts >= 25) {
    return {
      advice:
        "Gusty winds forecasted. Avoid aerial/tractor spraying to prevent wind drift onto adjacent crops.",
      bestTime: "Early morning calm window",
    };
  }
  if (item.temperatureMax >= 34) {
    return {
      advice:
        "High daytime heat. Ensure ample hydration for livestock and shift irrigation to late evening.",
      bestTime: "5:30 PM – 7:30 PM",
    };
  }
  return {
    advice:
      "Favorable clear conditions across fields. Suitable for sowing, harvesting, weeding, and fertilizer top-dressing.",
    bestTime: `${formatTime12h(item.sunrise)} – 10:30 AM`,
  };
};

export const getHourlyAdvice = (item) => {
  if (!item) return { status: "Optimal", tag: "🌾 Field Work" };
  if (item.weatherCode >= 95)
    return {
      status: "Severe",
      tag: "⛈️ Storm - Secure Farm & Nets",
      color: "text-amber-600 dark:text-amber-400",
    };
  if (item.rainProbability >= 60 || item.precipitation >= 1)
    return {
      status: "Rain Risk",
      tag: "🌧️ High Rain - Delay Spraying",
      color: "text-blue-600 dark:text-blue-400",
    };
  if (item.windSpeed >= 20 || item.windGusts >= 25)
    return {
      status: "High Wind",
      tag: "💨 Wind Drift - Avoid Spraying",
      color: "text-teal-600 dark:text-teal-400",
    };
  if (item.temperature >= 33)
    return {
      status: "High Heat",
      tag: "☀️ Peak Heat - Rest Livestock",
      color: "text-orange-600 dark:text-orange-400",
    };
  return {
    status: "Optimal",
    tag: "🌾 Ideal for Field Work",
    color: "text-emerald-600 dark:text-emerald-400",
  };
};
