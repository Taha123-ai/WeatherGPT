import { useState, useRef, useCallback } from "react";

export function useLiveCaption() {
  const [liveText, setLiveText] = useState("");
  const recognitionRef = useRef(null);

  const SpeechRecognition =
    typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const supported = !!SpeechRecognition;

  const start = useCallback(() => {
    if (!supported) return;
    setLiveText("");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let combined = "";
      for (let i = 0; i < event.results.length; i++) combined += event.results[i][0].transcript;
      setLiveText(combined);
    };
    recognition.onerror = () => {};

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      /* ignore double-start */
    }
  }, [supported]);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
  }, []);

  return { liveText, start, stop, supported };
}