"use client";

import { speak } from "@/app/utils/tts";

type SpeechButtonProps = {
  text: string;
  language?: string;
};

export default function SpeechButton({
  text,
  language = "kn-IN",
}: SpeechButtonProps) {
  const handleSpeak = () => {
    speak(text, language);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      aria-label="Listen"
      className="rounded-full p-2 transition hover:bg-[#e9e3d9]"
    >
      🔊
    </button>
  );
}