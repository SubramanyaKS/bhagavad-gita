'use client'

import React, { useEffect, useState } from 'react'
import { speak, stopSpeaking } from '@/app/utils/tts'

type SpeechButtonProps = {
  text: string
  language?: string
}

export default function SpeechButton({
  text,
  language = 'sa-IN',
}: SpeechButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const handleToggle = () => {
    if (isPlaying) {
      stopSpeaking()
      setIsPlaying(false)
    } else {
      speak(
        text,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      )
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isPlaying ? 'Stop recitation' : 'Listen to recitation'}
      title={isPlaying ? 'Stop recitation' : 'Listen to recitation'}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] uppercase tracking-[1px] transition cursor-pointer ${
        isPlaying
          ? 'border border-[#8f3a2b] bg-[#fbf2f0] text-[#8f3a2b]'
          : 'border border-[#ded6c9] bg-[#fffdf8] text-[#6d6356] hover:border-[#bfb3a0] hover:bg-[#f6f2eb]'
      }`}
    >
      <span className="text-[13px]">{isPlaying ? '⏹' : '🔊'}</span>
      <span>{isPlaying ? 'Stop' : 'Listen'}</span>
    </button>
  )
}
