import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import getWeatherInfo from "../../utils/forecast/getWeatherInfo";
import formatDayInfo from "../../utils/forecast/formatDayInfo";
import { formatTime12h, getDailyAdvice } from "../../utils/forecast/Advice";
import { Droplets, ChevronDown, Sprout } from "lucide-react";
import { useState } from "react";
import { forecastlanguage } from "../../constants/Language/forecastlanguage/forecastlanguage";

const Dailyforecast = ({ selectedDesktopDate, setSelectedDesktopDate }) => {
  const dailyData = useSelector((store) => store?.forecastslice?.daily);
  const selectedDesktopDay =
    dailyData?.find((d) => d?.date === selectedDesktopDate) || dailyData?.[0];
  const selectedDesktopDayInfo = formatDayInfo(
    selectedDesktopDay?.date,
    dailyData?.indexOf(selectedDesktopDay),
  );
  const [expandedDayDate, setExpandedDayDate] = useState(dailyData?.[0]?.date);
  const selectedDesktopAdvice = getDailyAdvice(selectedDesktopDay);

  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const text = forecastlanguage?.daily?.[userlanguage];
  return (
    <>
      <motion.div
        key="daily-view"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        {/* MOBILE VIEW (Interactive Touch List with Accordion Drawers) */}
        <div className="block lg:hidden space-y-2.5">
          {dailyData.map((day, index) => {
            const dayInfo = formatDayInfo(day.date, index);
            const weather = getWeatherInfo(day.weatherCode, 1);
            const isExpanded = expandedDayDate === day.date;
            const adviceInfo = getDailyAdvice(day);

            return (
              <motion.div
                key={day.date || index}
                layout
                onClick={() => setExpandedDayDate(isExpanded ? null : day.date)}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isExpanded
                    ? "bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                    : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 shadow-sm"
                }`}
              >
                {/* Main Summary Row */}
                <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-27.5">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
                      {weather.icon}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white block">
                        {dayInfo.day}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {weather.condition}
                      </span>
                    </div>
                  </div>

                  {/* Rain Chance */}
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 min-w-12.5">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{day.rainProbability}%</span>
                  </div>

                  {/* Temperature Range Bar */}
                  <div className="flex items-center gap-2 flex-1 max-w-32.5">
                    <span className="text-xs text-slate-400 font-medium w-6 text-right">
                      {Math.round(day.temperatureMin)}°
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-emerald-400 to-amber-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (day.temperatureMax - day.temperatureMin) * 12)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-900 dark:text-white font-bold w-6">
                      {Math.round(day.temperatureMax)}°
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Expandable Agricultural Details Drawer (Real Redux Schema) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 text-xs"
                    >
                      <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 mb-2.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                          <Sprout className="w-4 h-4 text-emerald-600" />
                          <span>{text?.farmaction}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {adviceInfo.advice}
                        </p>
                      </div>

                      {/* 6 Real Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 text-slate-600 dark:text-slate-400 font-medium">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 block">
                            {text?.wind}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-white">
                            {day.windSpeed} km/h ({day.windGusts})
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 block">
                            {text?.feelslike}
                          </span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">
                            {day.feelsLikeMax}°C
                          </span>
                        </div>

                        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 block">
                            {text?.uv}
                          </span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            {day.uvIndex}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (High-Clarity 7-Day Grid + Real Redux Daily Summary) */}
        <div className="hidden lg:block space-y-4">
          <div className="grid grid-cols-7 gap-3">
            {dailyData.map((day, index) => {
              const dayInfo = formatDayInfo(day.date, index);
              const weather = getWeatherInfo(day.weatherCode, 1);
              const isSelected = selectedDesktopDate === day.date;
              const isRainy = (day.rainProbability || 0) >= 50;

              return (
                <motion.div
                  key={day.date || index}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDesktopDate(day.date)}
                  className={`p-4 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col items-center justify-between text-center min-h-55 ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-500/10"
                      : isRainy
                        ? "bg-linear-to-b from-blue-50/40 via-white to-white dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900 border-blue-200/80 dark:border-blue-900/60 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div>
                    <span
                      className={`text-base font-extrabold block ${isSelected ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}
                    >
                      {dayInfo.day}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block">
                      {dayInfo.fullDate.split(", ")[1]}
                    </span>
                  </div>

                  <div className="my-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center">
                    {weather.icon}
                  </div>

                  <div className="w-full">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {Math.round(day.temperatureMax)}°{" "}
                      <span className="text-xs font-semibold text-slate-400">
                        / {Math.round(day.temperatureMin)}°C
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isRainy
                            ? "bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>{day.rainProbability}%</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Day Complete Agricultural Focus Summary Card (Desktop) */}
          <motion.div
            key={selectedDesktopDate || "desktop-summary"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 shrink-0">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {selectedDesktopDayInfo.day} (
                    {selectedDesktopDayInfo.fullDate}) Farm Guidance
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    {
                      getWeatherInfo(selectedDesktopDay?.weatherCode, 1)
                        .condition
                    }
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                  {selectedDesktopAdvice.advice}
                </p>
              </div>
            </div>

            {/* Real Meteorological Metric Specs on Desktop */}
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              <div className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <span className="text-[10px] text-slate-400 block font-normal">
                  {text?.sunrise}
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold truncate block">
                  {formatTime12h(selectedDesktopDay?.sunrise)} -{" "}
                  {formatTime12h(selectedDesktopDay?.sunset)}
                </span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <span className="text-[10px] text-slate-400 block font-normal">
                  {text?.wind}
                </span>
                <span>
                  {selectedDesktopDay?.windSpeed} km/h (
                  {selectedDesktopDay?.windGusts})
                </span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <span className="text-[10px] text-slate-400 block font-normal">
                  {text?.precipitation}
                </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {text?.uv1}{selectedDesktopDay?.precipitation} mm (
                  {selectedDesktopDay?.rainProbability}%)
                </span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <span className="text-[10px] text-slate-400 block font-normal">
                  {text?.uvfeelslike}
                </span>
                <span className="text-orange-600 dark:text-orange-400">
                   {selectedDesktopDay?.uvIndex} •{" "}
                  {selectedDesktopDay?.feelsLikeMax}°C
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Dailyforecast;
