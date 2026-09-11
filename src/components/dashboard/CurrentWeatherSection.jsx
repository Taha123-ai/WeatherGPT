import { motion } from "framer-motion";
import {
  MapPin,
  CloudSun,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Eye,
  Gauge,
  Compass,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Waves,
} from "lucide-react";
import { useSelector } from "react-redux";
import { getLocationName } from "../../utils/getLocationName";
import { getWeatherCondition } from "../../utils/approximation/getWetherCondition";
import { getComfortLevel } from "../../utils/approximation/getComfortLevel";
import { getWindDirection } from "../../utils/approximation/getWindDirection";
import { getFormatTime } from "../../utils/approximation/getFormatTime";
import { getWeatherHighlight } from "../../utils/approximation/getWeatherHighlight";
import { comfortLevelLanguage } from "../../constants/Language/comfortLevelLanguage";
import currentWeatherLanguage from "../../constants/Language/currentWeatherLanguage";
import { getFormatWeatherAlert } from "../../utils/approximation/getFormatWeatherAlert";
import useGetCityName from "../../Hooks/useGetCityName";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function CurrentWeatherSection({hourlydata}) {
  
  useGetCityName();
  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const language = currentWeatherLanguage[userlanguage];
  const dailyWeather = useSelector((store) => {
    return store?.forecastslice?.current;
  });
  const currentday = useSelector((store) => {
    return store?.forecastslice?.daily?.[0];
  });
  const sevenday = useSelector((store) => {
    return store?.forecastslice?.daily;
  });
  const source = useSelector((store) => {
    return store?.locationSource?.source;
  });
  const locationslicedata = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.location
      : store?.userlocation?.location?.address;
  });
  const state = locationslicedata?.state;

  const comfortKey = getComfortLevel(
    dailyWeather?.temperature,
    dailyWeather?.feelsLike,
  );

  const weatherHighlights = getWeatherHighlight(hourlydata?.[0], sevenday);

  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative overflow-hidden rounded-4xl bg-linear-to-br from-slate-50 via-sky-50/60 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900/90 dark:to-emerald-950/20 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-200/60 dark:shadow-none p-5 sm:p-8 lg:p-10"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-sky-400/15 dark:bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-emerald-400/15 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* --- Header: Location & Status --- */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{language?.name}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl sm:text-2xl">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {getLocationName(locationslicedata)}
                {state && (
                  <span className="text-slate-400 dark:text-slate-500 font-normal text-lg ml-1.5">
                    ({state})
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language?.liveobservation}</span>
              <span className="text-slate-400 dark:text-slate-500">
                • {language?.justnow}
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-8 pb-6">
          {/* Left Column: Primary Weather Showcase (5 Cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-between h-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                {/* Floating Animated Icon */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-amber-100 to-amber-200/90 dark:from-amber-950/50 dark:to-amber-900/40 text-amber-600 dark:text-amber-400 shadow-inner flex items-center justify-center border border-amber-200/50 dark:border-amber-800/40"
                >
                  <CloudSun className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>

                {/* Day's Range Pill */}
                <div className="flex flex-col items-end gap-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 text-xs font-semibold">
                    <span className="flex items-center text-rose-600 dark:text-rose-400">
                      <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                      {currentday?.temperatureMax}°
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">
                      |
                    </span>
                    <span className="flex items-center text-blue-600 dark:text-blue-400">
                      <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                      {currentday?.temperatureMin}°
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {language?.dayrangehighandlow}
                  </span>
                </div>
              </div>

              {/* Main Temperature Display */}
              <div className="mt-6 flex items-baseline">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
                  {dailyWeather?.temperature || "-"}
                </span>
                <span className="text-3xl sm:text-4xl font-light text-slate-500 dark:text-slate-400 ml-1">
                  °C
                </span>
              </div>

              {/* Condition text */}
              <p className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {getWeatherCondition(dailyWeather?.weatherCode, userlanguage)}
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                {language?.feelslike + " "}
                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                  {dailyWeather?.feelsLike}°C
                </strong>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Waves className="w-4 h-4" />
                {comfortLevelLanguage[userlanguage]?.[comfortKey]}
              </span>
            </div>
          </motion.div>

          {/* Right Column: 8 Weather Metric Cards (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {/* 1. Feels Like */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  {language?.feelslike}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyWeather?.feelsLike}°C
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {dailyWeather?.feelsLike > dailyWeather?.temperature
                    ? language?.warmerdth
                    : language?.match}
                </div>
              </div>
            </motion.div>

            {/* 2. Humidity */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-500" />
                  {language?.Humidity}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyWeather?.humidity}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(dailyWeather?.humidity, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Wind & Gusts */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-teal-500" />
                  {language?.Wind}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                  <Compass className="w-3 h-3" />
                  {getWindDirection(dailyWeather?.windDirection)}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyWeather?.windSpeed}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    {language?.speed}
                  </span>
                </div>
                {dailyWeather?.windGusts && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language?.gust + dailyWeather?.windGusts + language?.speed}
                  </div>
                )}
              </div>
            </motion.div>

            {/* 4. Rain Probability */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {language?.rain}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-950 dark:text-blue-200">
                  {dailyWeather?.rainProbability}%
                </div>
                <div className="text-[11px] text-blue-700/80 dark:text-blue-300/80 mt-0.5">
                  {language?.exp +
                    (dailyWeather?.precipitation ?? 0) +
                    language?.mm}
                </div>
              </div>
            </motion.div>

            {/* 5. UV Index */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  {language?.uv}
                </span>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  {dailyWeather?.uvLevel}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyWeather?.uvIndex}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    / 11
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-emerald-400 via-amber-400 to-rose-500 h-full rounded-full"
                    style={{
                      width: `${Math.min((dailyWeather?.uvIndex / 11) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 6. Pressure & Visibility */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-indigo-500" />
                  {language?.Pressure}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyWeather?.pressure}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    {language?.hpa}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  <Eye className="w-3 h-3 text-slate-400" />
                  {language?.vis +
                    " : " +
                    ((dailyWeather?.visibility ?? 0) / 1000).toFixed(1) +
                    language?.km}
                </div>
              </div>
            </motion.div>

            {/* 7. Sunrise & Sunset */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-sm shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <span className="flex items-center gap-1.5">
                  <Sunrise className="w-4 h-4 text-amber-500" />
                  {language?.suncycle}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1">
                    <Sunrise className="w-3.5 h-3.5 text-amber-500" />
                    {getFormatTime(currentday?.sunrise)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1">
                    <Sunset className="w-3.5 h-3.5 text-indigo-500" />
                    {getFormatTime(currentday?.sunset)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Bottom Alert / Advisory Banner --- */}

        <motion.div
          variants={itemVariants}
          className="mt-3 pt-4 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-linear-to-r from-blue-500/10 via-sky-500/10 to-transparent dark:from-blue-950/40 dark:via-sky-950/30 border border-blue-200/70 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 text-sm font-medium">
            <span className="text-xl p-1 bg-blue-100 dark:bg-blue-900/60 rounded-lg shrink-0">
              🌦️
            </span>
            {weatherHighlights.map((highlight) => (
              <p key={highlight.key}>
                {getFormatWeatherAlert(highlight, userlanguage)}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
