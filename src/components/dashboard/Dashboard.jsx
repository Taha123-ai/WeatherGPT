import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CurrentWeatherSection from "./CurrentWeatherSection";
import Title from "./Title";
import BrowseForecastCard from "./BrowseForecastCard";
// import AskDirectQuestion from "./AskDirectQuestion";
import VoiceInteraction from "./VoiceInteraction";
import {WHY_FEATURES} from "../../constants/whyfeatures"
import { useSelector } from "react-redux";
import { whyweathergptlanguage } from "../../constants/Language/whyweathergptlanguage";

export default function Dashboard({ hourlydata }) {
  const userlanguage = useSelector((store)=>{return store.user?.language});
  const language = WHY_FEATURES?.[userlanguage]
  const text = whyweathergptlanguage?.[userlanguage];
  return (
    <div className="min-h-screen bg-slate-50/60 -mt-6 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-300">
    
      <Title />
      <CurrentWeatherSection hourlydata={hourlydata} />
      <BrowseForecastCard />
      {/* <AskDirectQuestion /> */}
      <VoiceInteraction />

      {/* ------WHY WEATHERGPT----- */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {text?.heading}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1.5">
            {text?.why}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {language.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 transition-all flex flex-col items-start justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shadow-sm flex items-center justify-center mb-6 text-2xl">
                  {feat.emoji}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{feat.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>
          {text?.footer?.p1}
        </p>
        <p className="mt-1">
          {text?.footer?.p2}
        </p>
      </footer>
    </div>
  );
}
