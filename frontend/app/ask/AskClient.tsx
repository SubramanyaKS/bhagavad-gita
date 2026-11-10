'use client'

import React, { useMemo, useState, useSyncExternalStore } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SpeechButton from '@/app/component/SpeechButton'
import AiAnswerDisplay from '@/app/component/AiAnswerDisplay'
import { API_BASE_URL } from '@/app/utils/utils'
import { ALL_THEMES, AskTopic, searchAskGita } from './askData'

const QUICK_PROMPTS = [
  "I'm feeling lost",
  'How do I deal with fear?',
  'Understanding my purpose',
  'How should I handle failure?',
  'Why do I get so angry?',
  'Finding inner peace',
  'Letting go of attachment',
  'Making hard ethical choices',
]

const subscribeToCustomKey = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  window.addEventListener('gita_api_key_changed', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('gita_api_key_changed', callback)
  }
}

const getCustomKeySnapshot = (): string => {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('gita_gemini_key') || ''
}

export default function AskClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQuery = searchParams.get('q') || ''
  const initialTheme = searchParams.get('theme') || 'All'

  const [query, setQuery] = useState(initialQuery)
  const [selectedTheme, setSelectedTheme] = useState(initialTheme)

  // Gemini AI state
  const savedCustomKey = useSyncExternalStore(
    subscribeToCustomKey,
    getCustomKeySnapshot,
    () => '',
  )
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiAnswer, setAiAnswer] = useState<string | null>(null)
  const [aiModel, setAiModel] = useState<string | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [inputKey, setInputKey] = useState('')

  // Filter topics based on query and theme
  const filteredTopics = useMemo(() => {
    return searchAskGita(query, selectedTheme)
  }, [query, selectedTheme])

  const handleSelectPrompt = (prompt: string) => {
    setQuery(prompt)
    setSelectedTheme('All')
    setAiAnswer(null)
    setAiError(null)
    router.replace(`/ask?q=${encodeURIComponent(prompt)}`, { scroll: false })
  }

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme)
    setAiAnswer(null)
    setAiError(null)
    if (theme === 'All') {
      router.replace('/ask', { scroll: false })
    } else {
      router.replace(`/ask?theme=${encodeURIComponent(theme)}`, {
        scroll: false,
      })
    }
  }

  const handleClear = () => {
    setQuery('')
    setSelectedTheme('All')
    setAiAnswer(null)
    setAiError(null)
    router.replace('/ask', { scroll: false })
  }

  const handleAskGemini = async (customQuery?: string) => {
    const textToAsk = (customQuery || query).trim()
    if (!textToAsk) return

    setIsAiLoading(true)
    setAiError(null)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (savedCustomKey) {
        headers['x-gemini-api-key'] = savedCustomKey
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/gita/ask`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: textToAsk }),
      })

      const data = await res.json()

      if (data?.configured === false || data?.error === 'NO_API_KEY') {
        setShowKeyModal(true)
        setIsAiLoading(false)
        return
      }

      if (data?.success && data?.answer) {
        setAiAnswer(data.answer)
        setAiModel(data.model || 'Gemini')
      } else {
        setAiError(data?.message || 'Unable to generate response from Gemini AI.')
      }
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : 'Network error connecting to AI.')
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleSaveKey = () => {
    if (inputKey.trim()) {
      localStorage.setItem('gita_gemini_key', inputKey.trim())
      window.dispatchEvent(new Event('gita_api_key_changed'))
      setShowKeyModal(false)
      // Automatically run query with new key
      setTimeout(() => {
        handleAskGemini()
      }, 100)
    }
  }

  return (
    <div className="space-y-10">
      {/* Search Input Box */}
      <section className="mx-auto max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAskGemini()
              }
            }}
            placeholder="Ask about fear, purpose, failure, relationships, peace..."
            className="h-14 w-full rounded-2xl border border-[#dcd4c8] bg-[#fffdf8] pl-5 pr-28 font-sans text-[15px] text-[#29251f] shadow-[0_6px_25px_rgba(60,48,32,0.04)] outline-none transition focus:border-[#aaa092] focus:shadow-[0_8px_30px_rgba(60,48,32,0.08)]"
            aria-label="Ask the Gita a life question"
          />

          <div className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            {query ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear query"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] text-[#918678] hover:bg-[#ede7dc] transition cursor-pointer"
              >
                ✕
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => handleAskGemini()}
              title="Search and ask Gemini AI"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#302b24] text-[15px] text-[#fffdf8] transition hover:bg-[#1a1714] cursor-pointer"
            >
              ⌕
            </button>
          </div>
        </div>

        {/* AI Action Button & Prompts */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleAskGemini()}
            disabled={isAiLoading || !query.trim()}
            className="inline-flex items-center gap-2 rounded-full border border-[#d2c5b3] bg-[#fffdf8] px-4 py-1.5 font-sans text-[12px] font-medium text-[#4a4034] shadow-[0_2px_8px_rgba(60,48,32,0.04)] transition hover:border-[#b4a694] hover:bg-[#f6f2ea] disabled:opacity-50 cursor-pointer"
          >
            <span>✨</span>
            <span>{isAiLoading ? 'Seeking Krishna’s Counsel...' : 'Ask Krishna with Gemini AI'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="font-sans text-[11px] text-[#8c8071] underline decoration-[#c9bfae] underline-offset-4 hover:text-[#29251f] cursor-pointer"
          >
            {savedCustomKey ? '🔑 API Key Saved' : '⚙️ Setup Gemini Key'}
          </button>
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="font-sans text-[11px] uppercase tracking-[1.5px] text-[#9a8d7c]">
            Try asking:
          </span>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSelectPrompt(prompt)}
              className={`rounded-full border px-3 py-1 font-sans text-[11px] transition cursor-pointer ${
                query.toLowerCase() === prompt.toLowerCase()
                  ? 'border-[#302b24] bg-[#302b24] text-[#fffdf8]'
                  : 'border-[#ded6c9] bg-[#fffdf8] text-[#6d6356] hover:border-[#b4a694] hover:bg-[#f6f2ea]'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      {/* Gemini AI Response Card (if available or loading) */}
      {isAiLoading && (
        <section className="overflow-hidden rounded-[26px] border border-[#ded5c7] bg-[linear-gradient(135deg,#fcfbf8_0%,#f5eee4_100%)] p-6 sm:p-8 shadow-[0_15px_45px_rgba(60,48,32,0.06)] animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-[24px]">ॐ</span>
            <div>
              <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#9a8d7c]">
                Gemini AI • Grounded in the Bhagavad Gita
              </div>
              <h3 className="text-[20px] font-normal text-[#29251f]">
                Seeking sacred counsel for &ldquo;{query}&rdquo;...
              </h3>
            </div>
          </div>
          <div className="mt-5 space-y-2.5">
            <div className="h-3 w-3/4 rounded bg-[#e8dfd1]" />
            <div className="h-3 w-5/6 rounded bg-[#e8dfd1]" />
            <div className="h-3 w-2/3 rounded bg-[#e8dfd1]" />
          </div>
        </section>
      )}

      {aiError && (
        <section className="rounded-[20px] border border-[#e6b8af] bg-[#fbf2f0] p-5 text-center font-sans text-[13px] text-[#8f3a2b]">
          <p>{aiError}</p>
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="mt-2.5 inline-block font-medium underline cursor-pointer"
          >
            Check your Gemini API Key settings
          </button>
        </section>
      )}

      {aiAnswer && (
        <AiAnswerDisplay
          content={aiAnswer}
          query={query}
          model={aiModel}
          onDismiss={() => setAiAnswer(null)}
        />
      )}

      {/* Theme Filter Pills */}
      <section className="flex flex-wrap items-center justify-center gap-2 border-b border-[#e5dccd] pb-6">
        {ALL_THEMES.map((theme) => {
          const isSelected = selectedTheme.toLowerCase() === theme.toLowerCase()
          return (
            <button
              key={theme}
              type="button"
              onClick={() => handleSelectTheme(theme)}
              className={`rounded-full px-4 py-2 font-sans text-[12px] font-medium transition cursor-pointer ${
                isSelected
                  ? 'bg-[#302b24] text-[#fffdf8] shadow-[0_2px_10px_rgba(48,43,36,0.15)]'
                  : 'border border-[#ded6c9] bg-[#fffdf8] text-[#6b6154] hover:border-[#b4a694] hover:bg-[#f6f2ea]'
              }`}
            >
              {theme}
            </button>
          )
        })}
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-normal text-[#29251f]">
          {filteredTopics.length}{' '}
          {filteredTopics.length === 1 ? 'Curated Teaching' : 'Curated Teachings'}
        </h2>
        {query || selectedTheme !== 'All' ? (
          <button
            type="button"
            onClick={handleClear}
            className="font-sans text-[12px] text-[#817465] underline decoration-[#c8bdaf] underline-offset-4 hover:text-[#29251f] cursor-pointer"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {/* Results List */}
      {filteredTopics.length === 0 ? (
        <section className="rounded-[24px] border border-[#e0d9ce] bg-[#fffdf8] p-10 text-center">
          <div className="mb-2 text-[26px]">ॐ</div>
          <h3 className="mb-2 text-[22px] font-normal text-[#29251f]">
            No direct matches for &ldquo;{query}&rdquo;
          </h3>
          <p className="mx-auto mb-6 max-w-md font-sans text-[13px] leading-6 text-[#73685a]">
            The Gita speaks directly to matters of fear, duty, peace, purpose, and sorrow. Try asking Gemini AI with the button above or explore the foundational themes.
          </p>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl bg-[#302b24] px-5 py-2.5 font-sans text-[12px] text-[#fffdf8] transition hover:bg-[#201d19] cursor-pointer"
          >
            Show All Teachings
          </button>
        </section>
      ) : (
        <div className="space-y-10">
          {filteredTopics.map((topic: AskTopic) => (
            <article
              key={topic.id}
              className="overflow-hidden rounded-[26px] border border-[#e2d8cb] bg-[#fffdf8] shadow-[0_15px_45px_rgba(60,48,32,0.06)]"
            >
              {/* Topic Header Banner */}
              <div className="border-b border-[#efe6d8] bg-gradient-to-r from-[#faf6ee] via-[#fffdf8] to-[#f4ebe0] px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-[#d8cdbd] bg-[#fffdf8] px-3 py-1 font-sans text-[11px] uppercase tracking-[1.5px] text-[#7a6d5d]">
                      {topic.theme}
                    </span>
                    <span className="font-sans text-[12px] text-[#9b8d7c]">
                      {topic.sanskritName}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 text-[26px] font-normal text-[#29251f] sm:text-[32px]">
                  {topic.title}
                </h3>
                <p className="mt-1 font-sans text-[13px] uppercase tracking-[1.5px] text-[#8c7d69]">
                  {topic.subtitle}
                </p>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-7">
                {/* Krishna's Direct Counsel */}
                <div className="rounded-[22px] border border-[#e8ded0] bg-[#faf6ee] p-5 sm:p-6">
                  <div className="mb-2 font-sans text-[11px] uppercase tracking-[2px] text-[#93826e]">
                    Krishna’s Counsel • उपदेशः
                  </div>
                  <p className="font-sans text-[15px] leading-7 text-[#4d443a]">
                    {topic.krishnaCounsel}
                  </p>
                </div>

                {/* Sacred Verses */}
                <div className="space-y-4">
                  <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#8c7e6a]">
                    Guiding Verses from the Gita
                  </div>

                  {topic.verses.map((v) => (
                    <div
                      key={`${v.chapter}-${v.verse}`}
                      className="rounded-[20px] border border-[#e8dfd2] bg-[linear-gradient(135deg,#f8f5f0_0%,#f4efe9_100%)] p-5 sm:p-6"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8c7e6a]">
                          Chapter {v.chapter} • Verse {v.verse}
                        </span>
                        <SpeechButton text={v.sanskrit} language="sa-IN" />
                      </div>

                      <blockquote className="sanskrit-verse whitespace-pre-line text-[22px] leading-[1.8] text-[#2d261f] sm:text-[25px]">
                        {v.sanskrit}
                      </blockquote>

                      <p className="mt-2.5 font-sans text-[13px] italic leading-6 text-[#73685a]">
                        {v.iast}
                      </p>

                      <div className="mt-3.5 border-t border-[#e5dcce] pt-3 font-sans text-[14px] leading-7 text-[#494037]">
                        <span className="font-semibold text-[#29251f]">Meaning: </span>
                        {v.translation}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-[#e5dcce] pt-3">
                        <span className="font-sans text-[12px] text-[#897d6e]">
                          {v.context}
                        </span>
                        <Link
                          href={`/explore/chapter/${v.chapter}/verse/${v.verse}`}
                          className="font-sans text-[12px] text-[#5e5142] underline decoration-[#c8bdaf] underline-offset-4 hover:text-[#29251f]"
                        >
                          Read in context →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Takeaways */}
                <div className="rounded-[20px] border border-[#e8ded0] bg-[#fffdf8] p-5 sm:p-6">
                  <h4 className="mb-3 font-sans text-[11px] uppercase tracking-[2px] text-[#8c7d69]">
                    Key Spiritual Principles
                  </h4>
                  <ul className="space-y-2 font-sans text-[14px] leading-6 text-[#574f47]">
                    {topic.coreTakeaways.map((takeaway) => (
                      <li key={takeaway} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-[#b78952]">✦</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Daily Action */}
                <div className="rounded-[20px] border border-[#d8cdbc] bg-[#fbf8f2] p-5 sm:p-6">
                  <div className="mb-1.5 font-sans text-[11px] uppercase tracking-[2px] text-[#93826e]">
                    Daily Practice • अभ्यासः
                  </div>
                  <p className="font-sans text-[14px] italic leading-7 text-[#574d41]">
                    &ldquo;{topic.practicalAction}&rdquo;
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* API Key Modal / Settings Drawer */}
      {showKeyModal && (
        <div
          className="fixed inset-0 z-150 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-[26px] border border-[#e2d8cb] bg-[#fffdf8] p-6 sm:p-8 shadow-[0_25px_70px_rgba(40,32,20,0.25)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[22px]">✨</span>
                <h3 className="text-[20px] font-normal text-[#29251f]">
                  Gemini AI Setup
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ded5c7] text-[#6d6356] hover:bg-[#f3ece2] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="font-sans text-[13px] leading-6 text-[#6d6255]">
              Live AI responses are strictly grounded in the 700 verses of the Bhagavad Gita. You can add your free key in two ways:
            </p>

            <div className="rounded-xl border border-[#e5dccd] bg-[#fbf9f4] p-4 text-[12px] font-sans text-[#5c5245] space-y-2">
              <div>
                <strong>Option 1 (Secure Server Setup):</strong>
                <p className="mt-0.5 text-[#73685a]">
                  Open <code className="rounded bg-[#eae3d5] px-1 py-0.5">backend/.env</code> on your backend server and set:
                </p>
                <pre className="mt-1 rounded bg-[#ece4d6] p-2 text-[11px] font-mono text-[#383127]">
                  GEMINI_API_KEY=your_key_here
                </pre>
              </div>

              <div className="pt-2 border-t border-[#e8ded0]">
                <strong>Option 2 (Instant in Browser):</strong> Paste it directly below:
              </div>
            </div>

            <div>
              <label htmlFor="api-key-input" className="block font-sans text-[11px] uppercase tracking-[1.5px] text-[#8c7d69] mb-1.5">
                Gemini API Key
              </label>
              <input
                id="api-key-input"
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="h-11 w-full rounded-xl border border-[#dcd4c8] bg-[#fffdf8] px-3.5 font-mono text-[13px] outline-none transition focus:border-[#aaa092]"
              />
              <p className="mt-1 font-sans text-[11px] text-[#938676]">
                Get a free API key at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#5a4e40] hover:text-[#29251f]"
                >
                  aistudio.google.com
                </a>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              {savedCustomKey && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('gita_gemini_key')
                    window.dispatchEvent(new Event('gita_api_key_changed'))
                    setInputKey('')
                    setShowKeyModal(false)
                  }}
                  className="rounded-xl border border-[#e2d5c5] px-3.5 py-2 font-sans text-[12px] text-[#8f3a2b] hover:bg-[#fbf2f0] cursor-pointer"
                >
                  Remove Key
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveKey}
                disabled={!inputKey.trim()}
                className="rounded-xl bg-[#302b24] px-5 py-2 font-sans text-[12px] text-[#fffdf8] transition hover:bg-[#1a1714] disabled:opacity-50 cursor-pointer"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
