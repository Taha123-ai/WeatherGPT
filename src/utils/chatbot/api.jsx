const BASE_URL = "https://askgpt-project.onrender.com/api";

function getDeviceId() {
  let id = localStorage.getItem("askgpt_device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("askgpt_device_id", id);
  }
  return id;
}

// Retries a fetch once after a short delay before giving up — a single
// dropped connection or slow server response shouldn't immediately show
// "couldn't reach the server" to the user.
async function fetchWithRetry(url, options, retries = 1, delayMs = 600) {
  try {
    const res = await fetch(url, options);
    if (!res.ok && retries > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs);
    }
    return res;
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs);
    }
    throw err;
  }
}

export async function sendMessage(message) {
  const res = await fetchWithRetry(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: getDeviceId(), message }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json(); // { reply, city, intent, weatherData, language }
}

export async function getChatHistory() {
  const res = await fetchWithRetry(`${BASE_URL}/history/${getDeviceId()}`);
  if (!res.ok) throw new Error("Failed to load history");
  return res.json(); // { messages: [...] }
}

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  const res = await fetchWithRetry(`${BASE_URL}/voice/transcribe`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Failed to transcribe audio");
  return res.json(); // { transcript, languageCode }
}

export async function synthesizeSpeech(text, languageCode) {
  const res = await fetchWithRetry(`${BASE_URL}/voice/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, languageCode }),
  });
  if (!res.ok) throw new Error("Failed to generate speech");
  return res.json(); // { audio: "<base64 wav>" }
}
