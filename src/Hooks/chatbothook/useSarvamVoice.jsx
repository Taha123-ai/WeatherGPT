import { useState, useRef, useCallback } from "react";
import { transcribeAudio, synthesizeSpeech } from "../../utils/chatbot/api";

function pickSupportedMimeType() {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  return candidates.find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
}

// Tuning for auto-stop-on-silence:
const SILENCE_THRESHOLD = 8;        // amplitude (0-255 scale) below which we count as "quiet"
const SILENCE_DURATION_MS = 2500;   // how long it must stay quiet before we auto-stop — long enough that a normal breathing/thinking pause mid-sentence doesn't trigger it
const MIN_RECORDING_MS = 600;       // never auto-stop before this — avoids cutting off the first word

/**
 * useSarvamVoice(onTranscript)
 * ---------------------------------
 * Click once to start recording immediately. Uses real-time volume
 * analysis (Web Audio API) to detect when the user stops talking and
 * automatically stops + transcribes — no second click needed. Clicking
 * again while recording also stops it manually, as a fallback.
 */
export function useSarvamVoice(onTranscript) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const analyserIntervalRef = useRef(null);

  const cleanupAudioAnalysis = useCallback(() => {
    if (analyserIntervalRef.current) clearInterval(analyserIntervalRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    analyserIntervalRef.current = null;
    silenceTimerRef.current = null;
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }
    audioContextRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    cleanupAudioAnalysis();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }, [cleanupAudioAnalysis]);

  const startRecording = useCallback(async () => {
    if (recording) {
      // Clicking again while already recording = manual stop, as a fallback
      // to the automatic silence detection.
      stopRecording();
      return;
    }

    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone access isn't available in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickSupportedMimeType();
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onerror = () => {
        setError("Recording failed. Please try again.");
        cleanupAudioAnalysis();
        setRecording(false);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const durationMs = Date.now() - startTimeRef.current;

        if (durationMs < 400 || chunksRef.current.length === 0) {
          setError("Recording was too short — try holding for a moment while you speak.");
          return;
        }

        const audioBlob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        setProcessing(true);
        try {
          const { transcript } = await transcribeAudio(audioBlob);
          if (!transcript?.trim()) {
            setError("Couldn't make out any speech — try again a bit closer to the mic.");
          } else {
            onTranscript(transcript);
          }
        } catch (err) {
          setError("Couldn't transcribe that. Check your Sarvam API key is set correctly.");
        } finally {
          setProcessing(false);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);

      // --- Real-time silence detection so the user never has to click stop ---
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyserIntervalRef.current = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        // Average deviation from the 128 midpoint = a simple loudness proxy
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += Math.abs(dataArray[i] - 128);
        const amplitude = sum / dataArray.length;

        const elapsed = Date.now() - startTimeRef.current;

        if (amplitude < SILENCE_THRESHOLD) {
          if (elapsed > MIN_RECORDING_MS && !silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              stopRecording();
            }, SILENCE_DURATION_MS);
          }
        } else if (silenceTimerRef.current) {
          // Still talking — cancel the pending auto-stop
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }, 150);
    } catch (err) {
      setError("Microphone permission was denied. Allow mic access and try again.");
    }
  }, [onTranscript, recording, stopRecording, cleanupAudioAnalysis]);

  const speak = useCallback(async (text, languageCode = "en-IN") => {
    setSpeaking(true);
    setError(null);
    try {
      const { audio } = await synthesizeSpeech(text, languageCode);
      const audioEl = new Audio(`data:audio/wav;base64,${audio}`);
      audioEl.onended = () => setSpeaking(false);
      await audioEl.play();
    } catch (err) {
      setError("Couldn't generate speech. Check your Sarvam API key is set correctly.");
      setSpeaking(false);
    }
  }, []);

  return { startRecording, stopRecording, speak, recording, processing, speaking, error };
}
