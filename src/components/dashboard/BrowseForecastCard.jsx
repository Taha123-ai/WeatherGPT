import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Sun,
  CloudRain,
  CloudSun,
  CheckCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getDayName from "../../utils/getDayName";
import { browseForecastLanguage } from "../../constants/Language/browseForecastLanguage";

/**
 * ============================================================================
 * HYBRID FORECAST DISCOVERY COMPONENT
 * Simple on Mobile • Rich & Detailed on Desktop/Windows
 * ============================================================================
 */
export default function BrowseForecastCard() {
  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const text = browseForecastLanguage?.[userlanguage];

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/forecast");
  };

  const todaydata = useSelector((store) => store?.forecastslice?.daily);
  const currenthourdata = useSelector((store) => store?.forecastslice?.current);

  const todays24hourdata = useSelector(
    (store) => store?.forecastslice?.todays24hrdata
  );
  const todayhourtoshow = todays24hourdata?.filter((todays24hourdata, index) =>
    [6, 9, 12].includes(index),
  );
  
  return (
    <section
      className="py-4 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none"
      aria-label="Browse Weather Forecasts"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{text?.header?.tag}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {text?.header?.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {text?.header?.subtitle}
          </p>
        </div>

        {/* Desktop Helper */}
        <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <span>{text?.header?.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
        {/* ================= CARD 1: 7-DAY FORECAST ================= */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -3 }}
          onClick={() => handleRedirect()}
          className="group rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div>
            {/* Top Row: Icon + Title + Badge */}
            <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {text?.weekCard?.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {text?.weekCard?.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                {text?.weekCard?.badge}
              </span>
            </div>

            {/* DESKTOP ONLY: Extra Details Row (Hidden on Mobile) */}
            <div className="hidden sm:flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {text?.weekCard?.today} {currenthourdata?.temperature}
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>
                    {getDayName(todaydata?.[1].date)}{" "}
                    {text?.weekCard?.rain + " "}
                    {todaydata?.[1]?.rainProbability}%
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {getDayName(todaydata?.[2]?.date)}{" "}
                    {todaydata?.[2]?.temperatureMax}°
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                🌾 {text?.weekCard?.highlight}
              </span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {text?.weekCard?.link}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 2: HOURLY FORECAST ================= */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -3 }}
          onClick={() => handleRedirect()}
          className="group rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div>
            {/* Top Row: Icon + Title + Badge */}
            <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {text?.hourlyCard?.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {text?.hourlyCard?.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                <span>{text?.hourlyCard?.badge}</span>
              </div>
            </div>

            {/* DESKTOP ONLY: Extra Details Row (Hidden on Mobile) */}
            <div className="hidden sm:flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-[11px]">
                  {text?.hourlyCard?.slot1}: {todayhourtoshow?.[0]?.temperature}
                  °
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
                  {text?.hourlyCard?.slot2}: {todayhourtoshow?.[1]?.temperature}
                  °
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-[11px]">
                  {text?.hourlyCard?.slot3}: {todayhourtoshow?.[2]?.temperature}
                  °
                </span>
              </div>

              <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{text?.hourlyCard?.highlight}</span>
              </span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
              {text?.hourlyCard?.link}
            </span>
            <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
