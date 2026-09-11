import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable Animated Shimmer Block
 * Features a continuous light/dark beam reflection sweep via Framer Motion
 */
const ShimmerBlock = ({ className = "", style = {} }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden bg-slate-200/75 dark:bg-slate-800/80 rounded-xl ${className}`}
      style={style}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-slate-700/50 to-transparent pointer-events-none"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

/**
 * ============================================================================
 * WEATHERGPT HOME SHIMMER SKELETON
 * ============================================================================
 */
export default function Shimmer() {
  return (
    <div
      className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pointer-events-none select-none"
      aria-busy="true"
      aria-label="Loading WeatherGPT farm weather insights..."
    >
      {/* ====================================================================
          1. HERO SECTION SHIMMER
          ==================================================================== */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
        {/* Soft Background Ambient Blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-gradient-to-br from-emerald-100/40 via-sky-100/30 to-amber-100/20 dark:from-emerald-950/15 dark:via-sky-950/15 dark:to-amber-950/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Headline & Button Skeletons */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge Pill */}
              <ShimmerBlock className="w-64 h-8 rounded-full mb-5" />

              {/* Huge Headline Bars */}
              <ShimmerBlock className="w-11/12 h-10 sm:h-12 lg:h-14 rounded-2xl mb-3" />
              <ShimmerBlock className="w-3/4 h-10 sm:h-12 lg:h-14 rounded-2xl mb-5" />

              {/* Subtitle Paragraph */}
              <ShimmerBlock className="w-full max-w-xl h-4 rounded-lg mb-2" />
              <ShimmerBlock className="w-4/5 max-w-lg h-4 rounded-lg mb-8" />

              {/* CTAs */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5">
                <ShimmerBlock className="w-full sm:w-56 h-14 rounded-2xl" />
                <ShimmerBlock className="w-full sm:w-44 h-14 rounded-2xl" />
              </div>

              {/* Trust Tagline Pills */}
              <div className="mt-7 pt-5 border-t border-slate-200/80 dark:border-slate-800 w-full flex flex-wrap items-center gap-4">
                <ShimmerBlock className="w-32 h-4 rounded-md" />
                <ShimmerBlock className="w-36 h-4 rounded-md" />
                <ShimmerBlock className="w-28 h-4 rounded-md" />
              </div>
            </div>

            {/* Right: 3D Weather Scene Skeleton */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <div className="relative w-full max-w-[460px] h-[340px] sm:h-[400px] md:h-[440px] rounded-3xl border border-slate-200/70 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Floating Sun Orb Placeholder */}
                <div className="flex justify-end">
                  <ShimmerBlock className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
                </div>

                {/* Cloud & Pin Floating Layer */}
                <div className="flex items-center gap-3 px-4">
                  <ShimmerBlock className="w-48 sm:w-56 h-20 sm:h-24 rounded-3xl" />
                  <ShimmerBlock className="w-24 h-8 rounded-full self-end" />
                </div>

                {/* Isometric Field Slab Base */}
                <ShimmerBlock className="w-full h-24 sm:h-28 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WEATHER ALERT SHIMMER
          ==================================================================== */}
      <section className="py-3 sm:py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <ShimmerBlock className="w-10 h-10 rounded-xl bg-amber-200/60 dark:bg-amber-900/60 flex-shrink-0" />
            <div>
              <ShimmerBlock className="w-32 h-3.5 rounded-md mb-2 bg-amber-200/60 dark:bg-amber-900/60" />
              <ShimmerBlock className="w-64 sm:w-80 h-5 rounded-md bg-amber-200/80 dark:bg-amber-900/80" />
            </div>
          </div>
          <ShimmerBlock className="w-28 h-9 rounded-xl bg-amber-200/70 dark:bg-amber-900/70 self-end sm:self-center" />
        </div>
      </section>

      {/* ====================================================================
          3. CURRENT WEATHER CARD SHIMMER
          ==================================================================== */}
      <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8 lg:p-10">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800">
            <div>
              <ShimmerBlock className="w-32 h-4 rounded-md mb-2" />
              <ShimmerBlock className="w-48 h-6 rounded-lg" />
            </div>
            <ShimmerBlock className="w-28 h-6 rounded-full" />
          </div>

          {/* Core Weather & 4 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 pb-6">
            {/* Main Big Temperature & Icon */}
            <div className="md:col-span-5 flex items-center gap-6">
              <ShimmerBlock className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex-shrink-0" />
              <div>
                <ShimmerBlock className="w-32 h-14 sm:h-16 rounded-2xl mb-2" />
                <ShimmerBlock className="w-28 h-5 rounded-md" />
              </div>
            </div>

            {/* 4 Metric Blocks */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between h-28"
                >
                  <ShimmerBlock className="w-16 h-3.5 rounded-md" />
                  <ShimmerBlock className="w-14 h-7 rounded-lg my-1" />
                  <ShimmerBlock className="w-20 h-3 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-2 pt-4 border-t border-slate-200/70 dark:border-slate-800">
            <ShimmerBlock className="w-full h-11 rounded-xl" />
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. FARMER INSIGHT SECTION SHIMMER
          ==================================================================== */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <ShimmerBlock className="w-44 h-7 rounded-full mb-3" />
          <ShimmerBlock className="w-3/4 max-w-xl h-8 sm:h-10 rounded-xl mb-3" />
          <ShimmerBlock className="w-1/2 max-w-md h-4 rounded-md" />
        </div>

        {/* 3 Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between h-64"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <ShimmerBlock className="w-10 h-10 rounded-2xl" />
                  <ShimmerBlock className="w-24 h-6 rounded-full" />
                </div>
                <ShimmerBlock className="w-36 h-6 rounded-lg mb-3" />
                <ShimmerBlock className="w-full h-4 rounded-md mb-2" />
                <ShimmerBlock className="w-4/5 h-4 rounded-md" />
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <ShimmerBlock className="w-24 h-3.5 rounded-md" />
                <ShimmerBlock className="w-4 h-3.5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. ASK WEATHERGPT (QUICK QUESTIONS) SHIMMER
          ==================================================================== */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ShimmerBlock className="w-32 h-4 rounded-md mb-2" />
          <ShimmerBlock className="w-56 h-8 sm:h-10 rounded-xl mb-2" />
          <ShimmerBlock className="w-72 h-4 rounded-md" />
        </div>

        {/* 6 Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 h-20"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <ShimmerBlock className="w-9 h-9 rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <ShimmerBlock className="w-3/4 h-5 rounded-md mb-1.5" />
                  <ShimmerBlock className="w-1/2 h-3.5 rounded-md" />
                </div>
              </div>
              <ShimmerBlock className="w-7 h-7 rounded-lg flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          6. VOICE INTERACTION SECTION SHIMMER
          ==================================================================== */}
      <section className="py-12 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
          <ShimmerBlock className="w-40 h-10 sm:h-12 rounded-2xl mb-3 bg-slate-800" />
          <ShimmerBlock className="w-64 sm:w-96 h-4 rounded-lg mb-8 bg-slate-800" />

          {/* Big Circular Microphone Placeholder */}
          <div className="relative mb-9 flex items-center justify-center">
            <ShimmerBlock className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-800" />
          </div>

          {/* Languages Chips Skeleton */}
          <div className="w-full max-w-2xl flex flex-col items-center">
            <ShimmerBlock className="w-36 h-3.5 rounded-md mb-4 bg-slate-800" />
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[...Array(6)].map((_, i) => (
                <ShimmerBlock
                  key={i}
                  className="w-24 sm:w-28 h-9 rounded-xl bg-slate-800"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. 5-DAY FORECAST SHIMMER
          ==================================================================== */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <ShimmerBlock className="w-28 h-4 rounded-md mb-1.5" />
            <ShimmerBlock className="w-44 h-8 sm:h-9 rounded-xl" />
          </div>
        </div>

        {/* 5 Forecast Cards */}
        <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-auto rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-between h-52"
            >
              <div className="w-full flex flex-col items-center">
                <ShimmerBlock className="w-16 h-5 rounded-md mb-1.5" />
                <ShimmerBlock className="w-12 h-3.5 rounded-md" />
              </div>
              <ShimmerBlock className="w-12 h-12 rounded-2xl my-2" />
              <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <ShimmerBlock className="w-12 h-6 rounded-md" />
                <ShimmerBlock className="w-10 h-5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          8. WHY WEATHERGPT SHIMMER
          ==================================================================== */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <ShimmerBlock className="w-40 h-4 rounded-md mb-2" />
          <ShimmerBlock className="w-56 h-8 sm:h-10 rounded-xl mb-2" />
          <ShimmerBlock className="w-72 h-4 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-64"
            >
              <div>
                <ShimmerBlock className="w-14 h-14 rounded-2xl mb-6" />
                <ShimmerBlock className="w-36 h-6 rounded-lg mb-3" />
                <ShimmerBlock className="w-full h-4 rounded-md mb-2" />
                <ShimmerBlock className="w-3/4 h-4 rounded-md" />
              </div>
              <ShimmerBlock className="w-24 h-6 rounded-full mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          9. FINAL CTA SHIMMER
          ==================================================================== */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-950/80 border border-emerald-800/40 p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">
          <ShimmerBlock className="w-44 h-7 rounded-full mb-5 bg-emerald-900/80" />
          <ShimmerBlock className="w-3/4 max-w-lg h-9 sm:h-12 rounded-2xl mb-4 bg-emerald-900/80" />
          <ShimmerBlock className="w-1/2 max-w-md h-4 rounded-lg mb-8 bg-emerald-900/80" />
          <ShimmerBlock className="w-64 h-14 rounded-2xl bg-emerald-800/90" />
        </div>
      </section>
    </div>
  );
}