export const getWeatherHighlight = (hourly, daily) => {
  if (!Array.isArray(hourly) || !hourly.length) return [];
  if (!Array.isArray(daily) || !daily.length) return [];

  const highlights = [];

  const rainCodes = [
    51, 53, 55, // drizzle
    61, 63, 65, // rain
    80, 81, 82, // showers
  ];

  const showerCodes = [80, 81, 82];

  /*
   * Your hourly data starts from 00:00.
   * Find the current hour based on the system clock.
   */
  const now = new Date();

  const currentIndex = hourly.findIndex((hour) => {
    if (!hour?.time) return false;

    const hourDate = new Date(hour.time);

    return (
      hourDate.getFullYear() === now.getFullYear() &&
      hourDate.getMonth() === now.getMonth() &&
      hourDate.getDate() === now.getDate() &&
      hourDate.getHours() === now.getHours()
    );
  });

  // If current hour cannot be found, safely use first hour.
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  const currentHour = hourly[safeCurrentIndex];

  /*
   * Look only at the next 24 hours for immediate alerts.
   */
  const upcomingHours = hourly.slice(
    safeCurrentIndex,
    safeCurrentIndex + 24
  );

  /*
   * =========================
   * RAIN
   * =========================
   */

  const rainHours = upcomingHours.filter((hour) => {
    const code = Number(hour?.weatherCode ?? 0);
    const probability = Number(hour?.rainProbability ?? 0);
    const rain = Number(hour?.rain ?? 0);
    const showers = Number(hour?.showers ?? 0);

    return (
      rainCodes.includes(code) ||
      probability >= 60 ||
      rain > 0 ||
      showers > 0
    );
  });

  if (rainHours.length) {
    /*
     * Prefer the earliest meaningful rain event.
     *
     * This is better than simply taking the highest
     * probability because a 95% rain event 20 hours later
     * should not necessarily replace a 75% event happening
     * in the next hour.
     */
    const rainHour = rainHours[0];

    const probability = Number(
      rainHour?.rainProbability ?? 0
    );

    const code = Number(rainHour?.weatherCode ?? 0);

    highlights.push({
      key: showerCodes.includes(code)
        ? "rainShowers"
        : "rain",
      time: formatTime(rainHour?.time),
      probability,
    });
  }

  /*
   * =========================
   * STRONG WIND
   * =========================
   */

  const strongestWind = upcomingHours.reduce(
    (max, hour) => {
      const gust = Number(hour?.windGusts ?? 0);

      if (!max) return hour;

      return gust > Number(max?.windGusts ?? 0)
        ? hour
        : max;
    },
    null
  );

  const maxGust = Number(
    strongestWind?.windGusts ?? 0
  );

  if (maxGust >= 50) {
    highlights.push({
      key: "strongWind",
      time: formatTime(strongestWind?.time),
      value: maxGust,
    });
  }

  /*
   * =========================
   * TODAY
   * =========================
   */

  const today = daily[0];

  /*
   * =========================
   * UV
   * =========================
   */

  const currentUV = Number(
    currentHour?.uvIndex ?? 0
  );

  const todayUV = Number(
    today?.uvIndex ?? 0
  );

  /*
   * At night hourly UV is 0,
   * so use today's daily maximum UV.
   */
  const uv = currentUV > 0
    ? currentUV
    : todayUV;

  if (uv >= 8) {
    highlights.push({
      key: "veryHighUV",
      value: uv,
    });
  } else if (uv >= 6) {
    highlights.push({
      key: "highUV",
      value: uv,
    });
  } else if (uv >= 3) {
    highlights.push({
      key: "moderateUV",
      value: uv,
    });
  }

  /*
   * =========================
   * TEMPERATURE
   * =========================
   */

  const maxTemp = Number(
    today?.temperatureMax ?? 0
  );

  if (maxTemp >= 40) {
    highlights.push({
      key: "extremeHeat",
      value: maxTemp,
    });
  } else if (maxTemp >= 35) {
    highlights.push({
      key: "hotWeather",
      value: maxTemp,
    });
  }

  /*
   * =========================
   * LIMIT HIGHLIGHTS
   * =========================
   *
   * Homepage should not become a weather report.
   * Keep only the most useful 3 alerts.
   */

  const priority = {
    rain: 5,
    rainShowers: 5,
    strongWind: 4,
    extremeHeat: 3,
    hotWeather: 2,
    veryHighUV: 2,
    highUV: 1,
    moderateUV: 0,
  };

  highlights.sort(
    (a, b) =>
      (priority[b.key] ?? 0) -
      (priority[a.key] ?? 0)
  );

  const result = highlights.slice(0, 3);

  /*
   * Nothing significant happening.
   */
  if (!result.length) {
    return [{ key: "pleasantWeather" }];
  }

  return result;
};


const formatTime = (time) => {
  if (!time) return "";

  const timePart = time.split("T")[1];

  if (!timePart) return "";

  const [hour, minute] = timePart.split(":");

  const hourNumber = Number(hour);

  if (Number.isNaN(hourNumber)) return "";

  const formattedHour = hourNumber % 12 || 12;

  const period = hourNumber >= 12
    ? "PM"
    : "AM";

  return `${formattedHour}:${minute} ${period}`;
};