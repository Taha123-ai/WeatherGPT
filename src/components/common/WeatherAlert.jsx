import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronRight, X } from "lucide-react";

const WeatherAlert = () => {
  const [isAlertExpanded, setIsAlertExpanded] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  return (
    isAlertVisible && (
      <section className="py-3 sm:py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/20 border border-amber-300/80 dark:border-amber-700/60 p-4 sm:p-5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Weather Alert
                  </span>
                  <span className="text-[11px] text-amber-700/70 dark:text-amber-400/60">
                    • Advisory
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  Heavy rainfall may be possible tomorrow.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <button
                onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span>{isAlertExpanded ? "Hide Details" : "View Details"}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAlertExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
              <button
                onClick={() => setIsAlertVisible(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isAlertExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-amber-200/60 dark:border-amber-800/40">
                    <span className="font-semibold block text-slate-900 dark:text-white mb-1">
                      🌾 Farm Advisory
                    </span>
                    <span>
                      Secure loose netting and keep harvested grain sacks under
                      tarp covers before tomorrow afternoon.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-amber-200/60 dark:border-amber-800/40">
                    <span className="font-semibold block text-slate-900 dark:text-white mb-1">
                      ⏱️ Expected Timing
                    </span>
                    <span>
                      Showers likely starting tomorrow afternoon with brief
                      gusty winds.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    )
  );
};

export default WeatherAlert;
