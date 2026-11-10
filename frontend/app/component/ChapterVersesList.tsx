'use client'

import React from 'react'
import Link from 'next/link'
import ScriptSelector from './ScriptSelector'
import SpeechButton from './SpeechButton'
import {
  ScriptKey,
  setSavedScript,
  SUPPORTED_SCRIPTS,
  useScriptPreference,
} from '@/app/utils/scripts'

type VerseItem = {
  id: string
  chapter: number
  verse: number
  sanskrit: {
    devanagari: string
  }
  transliteration?: {
    iast?: string
  }
  scripts?: {
    kn?: string
    te?: string
    ta?: string
    ml?: string
    tcy?: string
  }
}

type ChapterVersesListProps = {
  verses: VerseItem[]
  chapterNumber: number
}

export default function ChapterVersesList({
  verses,
  chapterNumber,
}: ChapterVersesListProps) {
  const activeScript = useScriptPreference()

  const handleScriptChange = (nextScript: ScriptKey) => {
    setSavedScript(nextScript)
  }

  const currentOption = SUPPORTED_SCRIPTS.find((s) => s.key === activeScript) ?? SUPPORTED_SCRIPTS[0]

  const getVerseText = (item: VerseItem) => {
    if (activeScript === 'iast') {
      return item.transliteration?.iast || item.sanskrit?.devanagari
    }
    if (activeScript === 'kn' && item.scripts?.kn) {
      return item.scripts.kn
    }
    if (activeScript === 'te' && item.scripts?.te) {
      return item.scripts.te
    }
    if (activeScript === 'ta' && item.scripts?.ta) {
      return item.scripts.ta
    }
    if (activeScript === 'ml' && item.scripts?.ml) {
      return item.scripts.ml
    }
    return item.sanskrit?.devanagari || ''
  }

  return (
    <div className="space-y-6">
      {/* Script Toolbar */}
      <section className="flex flex-col gap-3 rounded-[20px] border border-[#e0d9ce] bg-[#fffdf8] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#9a8d7c]">
            Reading Script / लिपि
          </div>
          <div className="mt-0.5 font-sans text-[12px] text-[#6d6356]">
            Displaying in {currentOption.label} ({currentOption.nativeName})
          </div>
        </div>
        <ScriptSelector activeScript={activeScript} onChange={handleScriptChange} size="sm" />
      </section>

      {/* Verses List */}
      <div className="grid gap-4">
        {verses.map((item) => {
          const verseText = getVerseText(item)
          return (
            <article
              key={item.id}
              className="group rounded-[20px] border border-[#e0d9ce] bg-[#fffdf8] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#cfc6b8] hover:shadow-[0_12px_30px_rgba(60,48,32,0.07)] sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#efe8df] pb-3">
                <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#9a8d7c]">
                  Verse {item.verse}
                </div>
                <div className="flex items-center gap-2">
                  <SpeechButton text={verseText} language={currentOption.ttsLang} />
                  <Link
                    href={`/explore/chapter/${chapterNumber}/verse/${item.verse}`}
                    className="font-sans text-[12px] text-[#5f574c] transition hover:text-[#29251f]"
                  >
                    Read verse →
                  </Link>
                </div>
              </div>

              <p className="sanskrit-verse whitespace-pre-line text-[24px] text-[#2a241e] sm:text-[30px]">
                {verseText || 'The verse text is unavailable right now.'}
              </p>

              {item.transliteration?.iast && activeScript !== 'iast' ? (
                <p className="mt-4 border-t border-[#efe8df] pt-4 font-sans text-[14px] leading-7 text-[#574f47]">
                  {item.transliteration.iast}
                </p>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}
