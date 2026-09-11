import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import getWeatherInfo from "../../utils/forecast/getWeatherInfo";
import { formatTime12h, getHourlyAdvice } from "../../utils/forecast/Advice";
import { Droplets, Wind, Thermometer, Gauge } from "lucide-react";
import { forecastlanguage } from "../../constants/Language/forecastlanguage/forecastlanguage";

const Hourlyforecast = () => {
  const hourlyData = useSelector(
    (store) => store?.forecastslice?.todays24hrdata,
  );
  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const text = forecastlanguage?.hourly?.[userlanguage];

  const threeHourItems =
    hourlyData?.length > 12
      ? hourlyData.filter((_, idx) => idx % 2 === 0)
      : hourlyData;

  const [selectedTimeId, setSelectedTimeId] = useState(
    hourlyData?.[0]?.time || "2026-09-05T00:00",
  );
  const currentSelectedHour =
    threeHourItems?.find((h) => h.time === selectedTimeId) ||
    threeHourItems?.[0];
  const selectedHourWeather = getWeatherInfo(
    currentSelectedHour?.weatherCode,
    currentSelectedHour?.isDay,
  );
  const selectedHourAdvice = getHourlyAdvice(currentSelectedHour);
  return (
    <>
      <motion.div
        key="hourly-view"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        {/* 1. 3-Hour Interval Scrubber Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {threeHourItems.map((hour) => {
            const hourTimeId = hour.time;
            const isSelected = selectedTimeId === hourTimeId;
            const timeFormatted = formatTime12h(hour.time);
            const weather = getWeatherInfo(hour.weatherCode, hour.isDay);

            return (
              <motion.button
                key={hourTimeId}
                id={`hour-${hourTimeId.replace(/[^a-zA-Z0-9]/g, "")}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTimeId(hourTimeId)}
                className={`shrink-0 snap-center px-4 py-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 ring-2 ring-emerald-500/30"
                    : hour.isDay === 0
                      ? "bg-slate-900/90 text-slate-200 border-slate-800 shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 shadow-sm"
                }`}
              >
                <span className="text-[10px] font-bold block opacity-80 uppercase tracking-wider">
                  {timeFormatted.split(" ")[1] || "HR"}
                </span>
                <span className="text-sm font-extrabold block my-0.5">
                  {timeFormatted.split(" ")[0]}
                </span>
                <div className="flex justify-center my-1">{weather.icon}</div>
                <span className="text-base font-extrabold block">
                  {Math.round(hour.temperature)}°
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* 2. Detailed Spotlight Card for Selected Time */}
        <motion.div
          key={currentSelectedHour?.time || "hour-detail"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60">
                {selectedHourWeather.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {text?.time} {formatTime12h(currentSelectedHour?.time)} (
                    {currentSelectedHour?.time?.split("T")[0]})
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                    {currentSelectedHour?.isDay ? "DAY" : "NIGHT"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {currentSelectedHour?.temperature}°C —{" "}
                  {selectedHourWeather.condition}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 self-start sm:self-auto">
              <span>{text?.farmaction}</span>
              <span className={selectedHourAdvice.color}>
                {selectedHourAdvice.tag}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span>{text?.feelslike}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {currentSelectedHour?.feelsLike}°C
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {text?.dewpoint} {currentSelectedHour?.dewPoint}°C
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{text?.rainchance}</span>
              </div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {currentSelectedHour?.rainProbability}%
              </div>
              <span className="text-[10px] text-blue-600/80 dark:text-blue-400/80 block mt-0.5">
                {text?.precipitation} {currentSelectedHour?.precipitation} mm
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                <Wind className="w-4 h-4 text-teal-500" />
                <span>{text?.windspeed}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {currentSelectedHour?.windSpeed} km/h
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {text?.gust} {currentSelectedHour?.windGusts} km/h (
                {currentSelectedHour?.windDirection}°)
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                <Gauge className="w-4 h-4 text-emerald-500" />
                <span>{text?.HumidityClouds}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {currentSelectedHour?.humidity}%
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {text?.cloud} {currentSelectedHour?.cloudCover}% •{" "}
                {currentSelectedHour?.pressure} hPa
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Hourlyforecast;
