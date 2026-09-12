import { useEffect, useState } from "react";
import { getLocationName } from "../../utils/getLocationName";
import { useDispatch, useSelector } from "react-redux";
import { addlanguage } from "../../store/UserSlice";
import { languages } from "../../constants/Language/languages";
import navbarlanguage from "../../constants/Language/navbarLanguage";
import { useNavigate } from "react-router-dom";

function WeatherNavbar() {
  const dispatch = useDispatch();

  const source = useSelector((store) => {
    return store?.locationSource?.source;
  });
  const address = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.location
      : store?.userlocation?.location?.address;
  });
  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });

  const [ishomepage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState({
    code: "EN",
    name: "English",
    flag: "IN",
  });
  useEffect(() => {
    dispatch(addlanguage(selectedLang.code));
  });

  const navigate = useNavigate();
  const handleclick = () => {
    setIsMenuOpen(false);
    navigate("/location");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
              🌦
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              Weather<span className="text-cyan-400">GPT</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              onClick={()=>dispatch("/weathergpt")}
              href="/weathergpt"
              className=" items-center cursor-pointer gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {ishomepage
                ? navbarlanguage[userlanguage]?.chatbotbtn
                : navbarlanguage[userlanguage]?.homebtn}
            </a>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/60 transition-all text-xs font-semibold text-slate-300 hover:text-white shadow-sm"
              >
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.code}</span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? "rotate-180 text-cyan-400" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-2xl shadow-2xl p-1.5 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                        selectedLang.code === lang.code
                          ? "bg-cyan-500/15 text-cyan-300 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {selectedLang.code === lang.code && (
                        <span className="text-[10px] text-cyan-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Badge */}
            <button
              onClick={handleclick}
              className=" items-center flex gap-1.5 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition-all shadow-sm shadow-cyan-500/10"
            >
              <span>📍</span>
              <span>{getLocationName(address)}</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
              aria-label="Toggle Navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden px-4 pt-3 pb-5 space-y-3 bg-slate-900/95 border-t border-slate-800/80 backdrop-blur-2xl z-50">
          {" "}
          <a
            href="#home"
            className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
          >
            {navbarlanguage[userlanguage]?.homebtn}
          </a>
          <a
            href="#assistant"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            {navbarlanguage[userlanguage]?.chatbotbtn}
          </a>
          {/* Mobile Language Selector Grid */}
          <div className="pt-2 border-t border-slate-800">
            <span className="block px-3 text-xs text-slate-400 mb-2 font-medium">
              {navbarlanguage[userlanguage]?.selectlanguage}
            </span>
            <div className="grid grid-cols-2 gap-1.5 px-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
                    selectedLang.code === lang.code
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Mobile Location Badge */}
          <div className="pt-2">
            <button
              onClick={handleclick}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold"
            >
              <span>📍</span>
              <span>{getLocationName(address)}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default WeatherNavbar;
