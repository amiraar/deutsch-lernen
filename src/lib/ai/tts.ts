/**
 * Text-to-speech helper.
 *
 * Uses the browser Web Speech API (SpeechSynthesis) only — no API key, so nothing
 * secret is shipped to the client bundle.
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
};

// ─── Web Speech API ─────────────────────────────────────────────────

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

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Speaks a German word or sentence.
 *
 * Safe to call from any client component — no-ops on the server.
 *
 * @example
 * await speak("Guten Morgen");
 * await speak("Ich heiße Maria", { rate: 0.8 });
 */
export async function speak(text: string, options: TTSOptions = {}): Promise<void> {
  if (typeof window === "undefined") return;

  return speakWithWebSpeech(text, options);
}

/**
 * Stops any active TTS playback.
 */
export function stop(): void {
  stopWebSpeech();
}
