import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Crosshair,
  Loader2,
  X,
  ShieldCheck,
  ArrowRight,
  MapPinOff,
} from "lucide-react";
import useLocation from "../Hooks/useLocation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocationName } from "../utils/getLocationName";
import useGetCityName from "../Hooks/useGetCityName";
import useGeocoding from "../Hooks/useGeocoding";
import { setLocationSource } from "../store/locationSourceSlice";
import { addstatus } from "../store/locationslice";
import useMeteodata from "../Hooks/useMeteodata";
import { SUGGESTIONS } from "../constants/locationsuggestion";
import { locationpagelanguage } from "../constants/Language/locationpagelanguage";

export default function Location() {
  const language = useSelector((store) => {
    return store?.user?.language;
  });
  const text = locationpagelanguage?.[language];
  const inputref = useRef();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleclose = () => {
    navigate("/");
  };

  const { getLocationgeocoding, loading, clearError, error } =
    useGeocoding();
  const handlesearch = () => {
    dispatch(setLocationSource("search"));
    const city = searchQuery?.split(",")[0].trim();
    getLocationgeocoding(city);
    dispatch(addstatus("prompt"));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(addstatus("prompt"));
      dispatch(setLocationSource("search"));
      const city = searchQuery?.split(",")[0].trim();
      getLocationgeocoding(city);
    }
  };

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    `${s.city} ${s.state}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const longitude = useSelector((store) => {
    return store?.userlocation?.longitude;
  });

  const latitude = useSelector((store) => {
    return store?.selectedlocation?.latitude || store?.userlocation?.latitude;
  });

  const source = useSelector((store) => {
    return store?.locationSource?.source;
  });

  const address = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.location
      : store?.userlocation?.location?.address;
  });

  const isaddresspresent = useSelector((store) => {
   return store?.userlocation?.location?.address?.city;
  });

  

  const handleSelectCity = (city, state) => {
    const formatted = `${city} , ${state}`;
    setSearchQuery(formatted);
    inputref.current.focus();
  };

  const status = useSelector((store) => store?.userlocation?.status);
  const { getlocation, isLocating } = useLocation();
  const handlegetlocation = () => {
    dispatch(setLocationSource("gps"));
    getlocation();
  };
  useMeteodata();
  useGetCityName();

  return (
    <div className="relative min-h-screen w-full  overflow-hidden bg-slate-950 font-sans select-none">
      {/* ====================================================================
          1. REALISTIC WEATHERGPT DASHBOARD (BLURRED IN BACKGROUND)
          ==================================================================== */}
      <div
        className="absolute inset-0  filter blur-[9px] md:blur-[13px] scale-[1.03] opacity-40 dark:opacity-20 pointer-events-none transition-all duration-700"
        aria-hidden="true"
      ></div>

      {/* ====================================================================
          2. DARK TRANSLUCENT OVERLAY
          ==================================================================== */}
      <div
        onClick={handleclose}
        className="absolute  inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-[1px] transition-opacity"
      />

      {/* ====================================================================
          3. FOCUSED LOCATION CARD (POSITIONED SLIGHTLY ABOVE CENTER)
          ==================================================================== */}
      <div className="relative z-20 min-h-screen w-full  flex items-center justify-center px-4 py-8 sm:px-6 -translate-y-4 sm:-translate-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-110 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/60 dark:border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_1px_rgba(255,255,255,0.4)] p-6 sm:p-7 text-slate-900 dark:text-slate-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
        >
          {/* Subtle Ambient Radial Highlight inside card */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button (Optional) */}
          {latitude && (
            <button
              onClick={handleclose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close location selector"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Icon Header */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10">
              <MapPin className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h2
              id="location-modal-title"
              className="text-xl sm:text-[22px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug"
            >
              {text?.wheretocheck}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
              {text?.allowaccess}
            </p>
          </div>

          {/* Primary Action Button: Use Current Location */}
          <motion.button
            onClick={() => handlegetlocation()}
            disabled={isLocating}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/25 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-80"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{text?.detectgps}</span>
              </>
            ) : isaddresspresent ? (
              <>{isaddresspresent}</>
            ) : (
              <>
                <Crosshair className="w-4 h-4" />
                <span>{text?.mylocation}</span>
              </>
            )}
          </motion.button>
          {longitude && (
            <div className="text-green-400 text-sm pt-2">
              {text?.locationupdate}
            </div>
          )}
          {!isLocating && status === "denied" && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <MapPinOff className="h-4 w-4 shrink-0" />
              <span>{text?.locationblockedmssg}</span>
            </div>
          )}

          {/* Subtle OR Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="w-full border-t border-slate-200/80 dark:border-slate-800" />
            <span className="absolute bg-white/90 dark:bg-slate-900/90 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {text?.ox}
            </span>
          </div>

          {/* Search Input Box */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              ref={inputref}
              value={searchQuery}
              onChange={(e) => {
                clearError();
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Search city or area..."
              className="w-full pl-10 pr-9 py-3 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white dark:focus:bg-slate-800"
            />
            {searchQuery && (
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                }}
                whileTap={{ scale: 0.985 }}
                className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>

          {/* Quick Suggestions / Filter Results */}
          <div className="space-y-1 mb-6">
            {searchQuery ? (
              <div
                className="
                max-h-36 overflow-y-auto overflow-x-hidden
                rounded-xl
                bg-slate-50 dark:bg-slate-800/50
                border border-slate-200/60 dark:border-slate-700/50
                p-1
                divide-y divide-slate-100 dark:divide-slate-700/40
                scrollbar-thin
                [scrollbar-color:rgb(148_163_184/0.4)_transparent]
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-slate-400/40
                hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/70
                 "
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((s) => (
                    <button
                      key={s.city}
                      onClick={() => handleSelectCity(s.city, s.state)}
                      className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>
                        <strong>{s.city}</strong>, {s.state}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))
                ) : (
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                    onClick={handlesearch}
                    className="px-3 py-2 text-xs cursor-pointer text-green-400 text-center hover:text-slate-600 dark:hover:text-slate-200 transition-color duration-200"
                  >
                    {loading
                      ? text?.loading
                      : getLocationName(address)
                        ? text?.pressmssg + " " + searchQuery
                        : "selected."}
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 mr-1">
                  {text?.suggested}
                </span>
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s.city}
                    onClick={() => handleSelectCity(s.city, s.state)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-medium transition-colors border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
                  >
                    {s.city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {searchQuery && error && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-red-200/60 bg-red-50/80 px-4 py-2 text-sm text-red-600 shadow-sm dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
            >
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </motion.div>
          )}

          {/* Bottom Security / Flexibility Note */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{text?.changelocationanytime}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
