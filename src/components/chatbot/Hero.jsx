import { Sparkles } from "lucide-react";
const Hero = () => {
  return (
    <>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/6 px-3 py-1.5 text-[10px] font-medium tracking-widest text-cyan-600 dark:text-cyan-300">
        <Sparkles className="h-3 w-3" />
        AI WEATHER ASSISTANT
      </div>

      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Ask anything about{" "}
        <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
          weather
        </span>
      </h1>

      <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
        Speak naturally or type your question to get weather-aware answers and
        practical recommendations.
      </p>
    </>
  );
};

export default Hero;
