import { Mic, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { voiceinteractionlanguage } from "../../constants/Language/voiceinteractionlanguage";


const SUPPORTED_LANGUAGES = [
  { name: "English", logo: "A" },
  { name: "हिन्दी", logo: "अ" },
  { name: "தமிழ்", logo: "அ" },
  { name: "বাংলা", logo: "অ" },
  { name: "मराठी", logo: "म" },
  { name: "తెలుగు", logo: "అ" },
];

const VoiceInteraction = () => {
    const userlanguage = useSelector((store)=>{return store.user?.language});
    const text = voiceinteractionlanguage?.[userlanguage];
    const navigate = useNavigate();
  return (
    <>
      <section className="py-12 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-700/60 text-center flex flex-col items-center">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            {text?.justask}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mb-9 leading-relaxed">
            {text?.subtitle}
          </p>

          <div className="relative flex flex-col items-center mb-9">
            <motion.button
              onClick={() => navigate("/weathergpt")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-tr from-emerald-500 via-teal-500 to-emerald-400 p-1 shadow-[0_0_35px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] focus:outline-none focus:ring-4 focus:ring-emerald-400"
              aria-label="Tap and speak with WeatherGPT"
            >
              <div className="w-full h-full rounded-full bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center gap-1 border border-white/20">
                <Mic className="w-8 h-8 sm:w-9 sm:h-9 text-white animate-bounce" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200">
                  {text?.tapspeek}
                </span>
              </div>
            </motion.button>
          </div>

          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{text?.supportedlang}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-sm font-medium"
                >
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-xs text-slate-400 ml-1.5">
                    ({lang.logo})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VoiceInteraction;
