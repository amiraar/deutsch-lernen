/**
 * Text-to-speech helper.
 *
 * Strategy (client-side only):
 *   1. Web Speech API (SpeechSynthesis) — always available in modern browsers, free, no API key.
 *   2. Google Cloud TTS — richer voice quality, used when GOOGLE_TTS_API_KEY is set AND
 *      the caller explicitly requests high-quality output.
 *
 * All functions are safe to import in server components — they check for `window` before
 * calling any browser API and return early if called outside the browser.
 */

const GERMAN_LANG = "de-DE";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TTSOptions = {
  /** 0.1–10, default 1 */
  rate?: number;
  /** 0–2, default 1 */
  pitch?: number;
  /** 0–1, default 1 */
  volume?: number;
  /** Force Google Cloud TTS even if Web Speech API is available */
  forceCloud?: boolean;
};

// ─── Web Speech API (primary) ─────────────────────────────────────────────────

/**
 * Returns whether the Web Speech API is available in the current environment.
 */
export function isWebSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Speaks text using the browser's built-in Web Speech API.
 * Resolves when speech finishes, rejects on error or if API is unavailable.
 */
export function speakWithWebSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isWebSpeechAvailable()) {
      reject(new Error("Web Speech API not available"));
      return;
    }

    // Cancel any ongoing speech before starting a new one.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = GERMAN_LANG;
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;

    // Prefer a German voice if available.
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find((v) => v.lang.startsWith("de"));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`SpeechSynthesis error: ${event.error}`));

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Stops any currently playing Web Speech synthesis.
 */
export function stopWebSpeech(): void {
  if (isWebSpeechAvailable()) {
    window.speechSynthesis.cancel();
  }
}

// ─── Google Cloud TTS (fallback) ──────────────────────────────────────────────

/**
 * Fetches synthesized audio from Google Cloud TTS and plays it via an
 * AudioContext. Requires NEXT_PUBLIC_GOOGLE_TTS_API_KEY to be set.
 *
 * Falls back to Web Speech API if the key is missing or the request fails.
 */
export async function speakWithCloudTTS(
  text: string,
  options: TTSOptions = {}
): Promise<void> {
  if (typeof window === "undefined") return;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    console.warn("[TTS] NEXT_PUBLIC_GOOGLE_TTS_API_KEY not set, falling back to Web Speech API");
    return speakWithWebSpeech(text, options);
  }

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`;

  const body = {
    input: { text },
    voice: { languageCode: GERMAN_LANG, ssmlGender: "NEUTRAL" },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: options.rate ?? 1,
      pitch: options.pitch ?? 0,
      volumeGainDb: options.volume !== undefined ? (options.volume - 1) * 6 : 0,
    },
  };

  let audioContent: string;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Cloud TTS HTTP ${response.status}`);
    }

    const data = (await response.json()) as { audioContent: string };
    audioContent = data.audioContent;
  } catch (error) {
    console.warn("[TTS] Cloud TTS failed, falling back to Web Speech API:", error);
    return speakWithWebSpeech(text, options);
  }

  // Decode base64 MP3 and play via AudioContext.
  const binary = atob(audioContent);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const audioCtx = new AudioContext();
  const buffer = await audioCtx.decodeAudioData(bytes.buffer);
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);

  return new Promise((resolve, reject) => {
    source.onended = () => {
      void audioCtx.close();
      resolve();
    };
    source.addEventListener("error", (e) => {
      void audioCtx.close();
      reject(e);
    });
    source.start(0);
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Speaks a German word or sentence.
 *
 * Uses Google Cloud TTS when `forceCloud: true` and the API key is set;
 * otherwise falls back to the Web Speech API.
 *
 * Safe to call from any client component — no-ops on the server.
 *
 * @example
 * await speak("Guten Morgen");
 * await speak("Ich heiße Maria", { rate: 0.8, forceCloud: true });
 */
export async function speak(text: string, options: TTSOptions = {}): Promise<void> {
  if (typeof window === "undefined") return;

  if (options.forceCloud || !isWebSpeechAvailable()) {
    return speakWithCloudTTS(text, options);
  }

  return speakWithWebSpeech(text, options);
}

/**
 * Stops any active TTS playback (Web Speech only; Cloud TTS audio plays to completion).
 */
export function stop(): void {
  stopWebSpeech();
}
