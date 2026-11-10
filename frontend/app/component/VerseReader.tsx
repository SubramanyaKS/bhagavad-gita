'use client'

import React, { useState } from 'react'
import SpeechButton from './SpeechButton'
import ScriptSelector from './ScriptSelector'
import {
  ScriptKey,
  setSavedScript,
  SUPPORTED_SCRIPTS,
  useScriptPreference,
} from '@/app/utils/scripts'

type VerseReaderProps = {
  sanskritDevanagari: string
  transliterationIast?: string
  scripts?: {
    kn?: string
    te?: string
    ta?: string
    ml?: string
    hi?: string
  }
  translation?: string
}

export default function VerseReader({
  sanskritDevanagari,
  transliterationIast,
  scripts = {},
  translation,
}: VerseReaderProps) {
  const activeScript = useScriptPreference()
  const [showOriginal, setShowOriginal] = useState(false)

  const handleScriptChange = (nextScript: ScriptKey) => {
    setSavedScript(nextScript)
  }

  // Resolve current verse text based on active script
  let activeVerseText = sanskritDevanagari
  if (activeScript === 'iast') {
    activeVerseText = transliterationIast || sanskritDevanagari
  } else if (activeScript === 'kn' && scripts.kn) {
    activeVerseText = scripts.kn
  } else if (activeScript === 'te' && scripts.te) {
    activeVerseText = scripts.te
  } else if (activeScript === 'ta' && scripts.ta) {
    activeVerseText = scripts.ta
  } else if (activeScript === 'ml' && scripts.ml) {
    activeVerseText = scripts.ml
  }

  const currentOption = SUPPORTED_SCRIPTS.find((s) => s.key === activeScript) ?? SUPPORTED_SCRIPTS[0]
  const isOriginalDevanagari = activeScript === 'sa'

  return (
    <div className="space-y-6">
      {/* Script Selector Bar */}
      <section className="rounded-[20px] border border-[#e8dfd2] bg-[#fbf9f4] p-4 sm:p-5">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8c7e6a]">
            Select Script / लिपि
          </span>
          <span className="font-sans text-[11px] text-[#9b8d7c]">
            {currentOption.label} ({currentOption.nativeName})
          </span>
        </div>
        <ScriptSelector activeScript={activeScript} onChange={handleScriptChange} />
      </section>

      {/* Main Verse Box */}
      <section className="rounded-[22px] border border-[#e8dfd2] bg-[linear-gradient(135deg,#f8f5f0_0%,#f4efe9_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c8a060]" />
            <span className="font-sans text-[11px] uppercase tracking-[2px] text-[#8c7e6a]">
              {currentOption.nativeName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isOriginalDevanagari ? (
              <button
                type="button"
                onClick={() => setShowOriginal(!showOriginal)}
                className="rounded-full border border-[#ded6c9] bg-[#fffdf8] px-3 py-1.5 font-sans text-[11px] text-[#6d6356] transition hover:bg-[#f6f2ea] cursor-pointer"
              >
                {showOriginal ? 'Hide Sanskrit' : 'Show Sanskrit'}
              </button>
            ) : null}
            <SpeechButton text={activeVerseText} language={currentOption.ttsLang} />
          </div>
        </div>

        <blockquote className="sanskrit-verse whitespace-pre-line text-[28px] leading-[1.9] text-[#2d261f] sm:text-[34px]">
          {activeVerseText || sanskritDevanagari || 'The verse text is unavailable right now.'}
        </blockquote>

        {/* Optional comparison with original Devanagari */}
        {showOriginal && !isOriginalDevanagari ? (
          <div className="mt-6 border-t border-[#e2d8c9] pt-4">
            <div className="mb-2 font-sans text-[11px] uppercase tracking-[1.5px] text-[#9a8d7c]">
              Original Sanskrit (Devanagari)
            </div>
            <p className="sanskrit-verse whitespace-pre-line text-[22px] leading-relaxed text-[#5a5045]">
              {sanskritDevanagari}
            </p>
          </div>
        ) : null}
      </section>

      {/* Transliteration (if not already viewing IAST) */}
      {transliterationIast && activeScript !== 'iast' ? (
        <section className="rounded-[20px] border border-[#e9e0d4] bg-[#fffdf8] p-5 sm:p-6">
          <div className="mb-3 font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
            IAST Roman Transliteration
          </div>
          <p className="font-sans text-[15px] leading-7 text-[#574f47]">
            {transliterationIast}
          </p>
        </section>
      ) : null}

      {/* Translation */}
      {translation ? (
        <section className="rounded-[20px] border border-[#e9e0d4] bg-[#fffdf8] p-5 sm:p-6">
          <div className="mb-3 font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
            Translation & Meaning
          </div>
          <p className="font-sans text-[16px] leading-8 text-[#4f483f]">
            {translation}
          </p>
        </section>
      ) : null}
    </div>
  )
}
