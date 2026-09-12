import { useState, useEffect, useRef } from "react";
import { Send, Mic, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendMessage } from "../utils/chatbot/api"
import { useSarvamVoice } from "../Hooks/chatbothook/useSarvamVoice";
import { useLiveCaption } from "../Hooks/chatbothook/useLiveCaption";
import Hero from "../components/chatbot/Hero";
import Chat from "../components/chatbot/Chat";

// Maps our detected language code to the BCP-47 code Sarvam's TTS expects.
const LANG_TO_VOICE_CODE = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  te: "te-IN",
  ta: "ta-IN",
};

export default function Chatbot() {
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  // No history fetch here on purpose — every refresh starts with a clean
  // chat instead of restoring the previous conversation. (Backend still
  // logs messages for the last-discussed-city memory feature; this just
  // controls what the UI shows on load.)
  const historyLoaded = true;
  const scrollRef = useRef(null);

  const {
    startRecording,
    stopRecording,
    speak,
    recording,
    processing: transcribing,
    error: voiceError,
  } = useSarvamVoice((transcript) => setInputQuery(transcript));

  const {
    liveText,
    start: startLiveCaption,
    stop: stopLiveCaption,
    supported: liveCaptionSupported,
  } = useLiveCaption();

  // One click starts recording immediately. Clicking again manually stops
  // it early; otherwise it auto-stops on its own once you go quiet.
  function handleMicClick() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
      if (liveCaptionSupported) startLiveCaption();
    }
  }

  useEffect(() => {
    if (!recording && liveCaptionSupported) stopLiveCaption();
  }, [recording, liveCaptionSupported, stopLiveCaption]);

  useEffect(() => {
    if (recording && liveCaptionSupported) setInputQuery(liveText);
  }, [liveText, recording, liveCaptionSupported]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  async function handleAsk(text) {
    const question = (text ?? inputQuery).trim();
    if (!question || sending) return;

    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setInputQuery("");
    setSending(true);

    try {
      const result = await sendMessage(question);
      const langCode = LANG_TO_VOICE_CODE[result.language] || "en-IN";
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: result.reply, verified: !!result.city, langCode },
      ]);
      speak(result.reply, langCode);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Couldn't reach the server — is the backend running?",
          verified: false,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (recording || transcribing) return; // don't send partial/in-progress voice text
      handleAsk();
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-105 w-105 rounded-full bg-cyan-400/6 dark:bg-cyan-400/4 blur-[120px]"
          animate={{
            x: [0, 40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-40 -right-40 h-105 w-105 rounded-full bg-violet-400/4 dark:bg-violet-500/4 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ================= MAIN ================= */}
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <Hero />
        </motion.div>

        {/* ================= CHAT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative flex-1"
        >
          <Chat
            historyLoaded={historyLoaded}
            scrollRef={scrollRef}
            setInputQuery={() => setInputQuery}
            messages={messages}
            sending={sending}
          />
        </motion.div>

        {/* ================= INPUT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 sm:mt-5"
        >
          {/* Error */}
          <AnimatePresence>
            {voiceError && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-2 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] text-amber-600 dark:text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {voiceError}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Composer */}
          <div className="group relative">
            <div className="absolute -inset-px rounded-[28px] bg-linear-to-r from-cyan-400/20 via-violet-400/10 to-cyan-400/20 opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-100" />

            <motion.div
              layout
              className="
              relative
              flex
              items-center
              gap-2
              rounded-[28px]
              border
              border-slate-200
              bg-white/90
              p-2
              shadow-lg
              shadow-slate-900/5
              backdrop-blur-xl
              transition-all
              duration-300
              group-focus-within:border-cyan-400/40
              group-focus-within:shadow-cyan-500/8

              dark:border-white/8
              dark:bg-slate-800/90
              dark:shadow-black/20
            "
            >
              {/* ================= MIC ================= */}
              <motion.button
                onClick={handleMicClick}
                disabled={transcribing || sending}
                whileHover={!recording ? { scale: 1.04 } : {}}
                whileTap={{ scale: 0.92 }}
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  recording
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-cyan-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-cyan-300"
                }`}
                type="button"
              >
                {recording && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-red-400"
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                      }}
                    />

                    <motion.span
                      className="absolute -inset-1.25 rounded-full border border-red-400/40"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                  </>
                )}

                {transcribing ? (
                  <Loader2 className="relative z-10 h-5 w-5 animate-spin" />
                ) : (
                  <Mic className="relative z-10 h-5 w-5" />
                )}

                {recording && (
                  <motion.span
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                    className="absolute right-1 top-1 z-20 h-2.5 w-2.5 rounded-full border-2 border-red-500 bg-white"
                  />
                )}
              </motion.button>

              {/* ================= INPUT ================= */}
              <input
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  recording
                    ? "Listening..."
                    : transcribing
                      ? "Transcribing..."
                      : "Type or tap the mic to speak..."
                }
                className="
                min-w-0
                flex-1
                bg-transparent
                px-1
                text-sm
                text-slate-800
                outline-none
                placeholder:text-slate-400
                dark:text-slate-100
                dark:placeholder:text-slate-500
              "
              />

              {/* ================= SEND ================= */}
              <motion.button
                whileHover={inputQuery.trim() ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleAsk(inputQuery)}
                disabled={
                  sending || recording || transcribing || !inputQuery.trim()
                }
                className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-linear-to-br
                from-cyan-400
                to-cyan-500
                text-slate-950
                shadow-lg
                shadow-cyan-500/20
                transition-all
                duration-200
                disabled:cursor-not-allowed
                disabled:opacity-20
              "
                type="button"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>

          <p className="mt-2 text-center text-[9px] text-slate-400 dark:text-slate-600 sm:text-[10px]">
            Weather intelligence powered by real-time forecast data
          </p>
        </motion.div>
      </main>
    </div>
  );
}
