import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dailyforecast from "../components/forecast/Dailyforecast";
import Hourlyforecast from "../components/forecast/Hourlyforecast";
import { forecastlanguage } from "../constants/Language/forecastlanguage/forecastlanguage";

export default function Forecast() {
  const dailyData = useSelector((store) => store?.forecastslice?.daily);

  const latitude = useSelector((store) => {
    return store?.userlocation?.latitude ?? store?.selectedlocation?.latitude;
  });
  const longitude = useSelector((store) => {
    return store?.userlocation?.longitude ?? store?.selectedlocation?.latitude;
  });

  const [activeTab, setActiveTab] = useState("daily"); // 'daily' | 'hourly'

  const [selectedDesktopDate, setSelectedDesktopDate] = useState(
    dailyData?.[0]?.date || "2026-09-05",
  );

  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const text = forecastlanguage?.title?.[userlanguage];
  if (latitude === null && longitude === null) {
    return <Navigate to="/location" />;
  }
  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <section
        className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none"
        aria-label="Interactive Weather Forecast"
      >
        <div className="flex flex-col py-7 sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{text.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeTab === "daily" ? text?.daily : text?.hourly}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {activeTab === "daily"
                ? text?.dailydescription
                : text?.hourlydescription}
            </p>
          </div>

          {/* TWO OPTIONS SWITCHER */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 self-start sm:self-auto shadow-inner w-full sm:w-auto">
            {/* OPTION 1: DAILY */}
            <button
              onClick={() => setActiveTab("daily")}
              className={`relative flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                activeTab === "daily"
                  ? "text-emerald-950 dark:text-emerald-100"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {activeTab === "daily" && (
                <motion.div
                  layoutId="forecastTabIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Calendar className="relative z-10 w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="relative z-10">Daily</span>
            </button>

            {/* OPTION 2: DAILY 24 HRS (EVERY 3 HRS) */}
            <button
              onClick={() => setActiveTab("hourly")}
              className={`relative flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                activeTab === "hourly"
                  ? "text-emerald-950 dark:text-emerald-100"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {activeTab === "hourly" && (
                <motion.div
                  layoutId="forecastTabIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Clock className="relative z-10 w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="relative z-10">Daily 24 Hrs (3h)</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "daily" ? (
            <Dailyforecast
              selectedDesktopDate={selectedDesktopDate}
              setSelectedDesktopDate={setSelectedDesktopDate}
            />
          ) : (
            <Hourlyforecast />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
