import { CheckCircle2, Volume2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSarvamVoice } from "../../Hooks/chatbothook/useSarvamVoice";
import { useSelector } from "react-redux";
import { chatbotlanguage } from "../../constants/Language/chatbot/chatbotlanguage";

const Chat = ({
  historyLoaded,
  scrollRef,
  setInputQuery,
  messages,
  sending,
}) => {
  const { speak, speaking } = useSarvamVoice((transcript) =>
    setInputQuery(transcript),
  );
  const language = useSelector((store) => store?.user?.language);
  const text = chatbotlanguage[language];
  return (
    <div
      ref={scrollRef}
      className="
        weather-chat-scroll
        relative
        flex-1
        min-h-155
        sm:min-h-108
        sm:max-h-[62vh]
        max-h-[72vh]
        overflow-y-auto
        overscroll-contain
        scroll-smooth
        rounded-3xl
        pt-4
        px-2
        mt-3
        sm:mt-1
        border
        border-slate-200/70
        bg-white/70
        shadow-xl
        shadow-slate-900/4
        backdrop-blur-2xl
        sm:p-6
            
        dark:border-white/[0.07]
        dark:bg-slate-900/60

        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        scrollbar-none
      "
    >
      {/* ================= EMPTY STATE ================= */}
      {historyLoaded && messages.length === 0 && !sending && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-87.5 flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-5"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-800">
              <Sparkles className="h-7 w-7 text-cyan-500 dark:text-cyan-300" />
            </div>
          </motion.div>

          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
            {text?.centerTitle}
          </h2>

          <p className="mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {text?.description}
          </p>

          {/* <div className="mt-5 flex flex-wrap justify-center gap-2">
        {[
          "Will it rain tomorrow?",
          "Should I carry an umbrella?",
          "Can I spray pesticides?",
        ].map((text, index) => (
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -2 }}
            className="
                  rounded-full
                  border border-slate-200
                  bg-slate-100/80
                  px-3 py-2
                  text-[10px]
                  text-slate-500
                  dark:border-white/6
                  dark:bg-slate-800/80
                  dark:text-slate-400
                  sm:text-xs
                "
          >
            {text}
          </motion.span>
        ))}
      </div> */}
        </motion.div>
      )}

      {/* ================= MESSAGES ================= */}
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className={`mb-5 flex items-end gap-2.5 ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* BOT */}
            {m.from === "bot" && (
              <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-800">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-300" />
              </div>
            )}

            {/* MESSAGE */}
            <div
              className={`max-w-[82%] rounded-[20px] px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] ${
                m.from === "user"
                  ? "rounded-br-md bg-linear-to-br from-violet-600 to-violet-700 text-white"
                  : "rounded-bl-md border border-slate-200/80 bg-slate-100/80 text-slate-800 dark:border-white/6 dark:bg-slate-800 dark:text-slate-100"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              <div className="mt-2.5 flex items-center justify-between gap-3">
                {m.from === "bot" && m.verified && (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/15 bg-cyan-500/6 px-2 py-1 text-[10px] text-cyan-600 dark:text-cyan-300">
                    <CheckCircle2 className="h-3 w-3" />
                    {text?.Verified}
                  </div>
                )}

                {m.from === "bot" && (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => speak(m.text, m.langCode || "en-IN")}
                    disabled={speaking}
                    className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-cyan-500/10 hover:text-cyan-500 disabled:opacity-30"
                    type="button"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* USER */}
            {m.from === "user" && (
              <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-[11px] font-semibold text-violet-500 dark:text-violet-300">
                U
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ================= THINKING ================= */}
      <AnimatePresence>
        {sending && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-800">
              <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-300" />
            </div>

            <div className="rounded-[18px] rounded-bl-md border border-slate-200 bg-slate-100 px-4 py-3 dark:border-white/6 dark:bg-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="mr-1 text-xs text-slate-500 dark:text-slate-400">
                  {text?.Thinking}
                </span>

                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-500"
                    animate={{
                      y: [0, -4, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: dot * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
