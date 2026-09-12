import { motion } from "framer-motion";
import { Sparkles, Mic, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dashboardlanguage from "../../constants/Language/dashboardLanguage";


const Title = () => {
  const userlanguage = useSelector((store)=>{return store.user?.language});
  const navigate = useNavigate();
  return (
    <>
      <section className="relative overflow-hidden py-10 pb-8 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-3">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 sm:w-175 h-137.5 sm:h-175 bg-linear-to-br from-emerald-100/70 via-sky-100/50 to-amber-100/40 dark:from-emerald-950/20 dark:via-sky-950/20 dark:to-amber-950/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Headlines & Actions */}
            <motion.div
              className="lg:col-span-7 flex flex-col items-start text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{dashboardlanguage[userlanguage]?.titlealert}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-5">
                {dashboardlanguage[userlanguage]?.maintitlespan1+" "}
                <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  {dashboardlanguage[userlanguage]?.maincolouredtitle}
                </span>{" "}
                {dashboardlanguage[userlanguage]?.maintitlespan3}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
                {dashboardlanguage[userlanguage]?.titledescription}
              </p>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-3">
                <motion.button
                  onClick={() => navigate("/weathergpt")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="Talk to WeatherGPT"
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                  <span>{dashboardlanguage[userlanguage]?.talktogptbtn}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 opacity-80" />
                </motion.button>
              </div>

              <div className="mt-7 pt-5 border-t border-slate-200/80 dark:border-slate-800 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span>✅ {dashboardlanguage[userlanguage]?.featurespan1}</span>
                <span>🎙️ {dashboardlanguage[userlanguage]?.featurespan2}</span>
                <span>🚨 {dashboardlanguage[userlanguage]?.featurespan3}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Title;
