import { header, QUICK_QUESTIONS } from "../../constants/quickquestion";
import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AskDirectQuestion = () => {
  const navigate = useNavigate();
  const userlanguage = useSelector((store) => {
    return store.user?.language;
  });
  const text = header?.[userlanguage];
  const quickquestion = QUICK_QUESTIONS?.[userlanguage];
  return (
    <>
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end my-2 stify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>{text?.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {text?.title}{" "}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
              {text?.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-1 sm:gap-4">
          {quickquestion.map((q) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/weathergpt")}
              className="group w-full text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className="text-2xl sm:text-3xl shrink-0"
                  role="img"
                  aria-hidden="true"
                >
                  {q.emoji}
                </span>
                <div className="min-w-0">
                  <span className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors block truncate">
                  {q.text}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block truncate">
                    {q.hint}
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 text-slate-400 group-hover:text-emerald-600 transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </>
  );
};

export default AskDirectQuestion;
