'use client'

import React, { useState } from 'react'
import SpeechButton from './SpeechButton'

type AiAnswerDisplayProps = {
  content: string
  query: string
  model?: string | null
  onDismiss: () => void
}

type SectionType = 'perspective' | 'verse' | 'sadhana' | 'blessing' | 'general'

interface ParsedSection {
  id: string
  title: string
  type: SectionType
  icon: string
  badge: string
  lines: string[]
}

function cleanTitle(title: string): string {
  return title
    .replace(/^#{1,4}\s*/, '')
    .replace(/\*\*/g, '')
    .trim()
}

function classifySection(title: string): { type: SectionType; icon: string; badge: string } {
  const lower = title.toLowerCase()
  if (lower.includes('perspective') || lower.includes('दृष्टिकोण')) {
    return { type: 'perspective', icon: '🌟', badge: 'Core Perspective • दृष्टिकोणः' }
  }
  if (lower.includes('verse') || lower.includes('श्लोक') || lower.includes('shloka')) {
    return { type: 'verse', icon: '📜', badge: 'Guiding Verse • श्लोकः' }
  }
  if (lower.includes('sadhana') || lower.includes('अभ्यास') || lower.includes('practical') || lower.includes('action')) {
    return { type: 'sadhana', icon: '💡', badge: 'Practical Sadhana • अभ्यासः' }
  }
  if (lower.includes('blessing') || lower.includes('आशीर्वाद') || lower.includes('closing')) {
    return { type: 'blessing', icon: '🕊️', badge: 'Closing Blessing • आशीर्वादः' }
  }
  return { type: 'general', icon: '✦', badge: title || 'Spiritual Counsel' }
}

function parseContentToSections(content: string): ParsedSection[] {
  const rawLines = content.split('\n')
  const sections: ParsedSection[] = []

  let currentTitle = ''
  let currentLines: string[] = []
  let sectionIndex = 0

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim()
    // Match headings like ### Title or ## Title or **Title:**
    const headingMatch = trimmed.match(/^(?:#{2,3}\s+(.+)|(?:\*\*(?:[A-Za-z\s]+(?:Perspective|Verse|Sadhana|Blessing|Guidance)[^:]*)\*\*:?))$/i)

    if (headingMatch) {
      if (currentTitle || currentLines.some((l) => l.trim().length > 0)) {
        const { type, icon, badge } = classifySection(currentTitle)
        sections.push({
          id: `sec-${sectionIndex++}`,
          title: cleanTitle(currentTitle),
          type,
          icon,
          badge,
          lines: currentLines,
        })
        currentLines = []
      }
      currentTitle = headingMatch[1] || headingMatch[0]
    } else {
      currentLines.push(rawLine)
    }
  }

  if (currentTitle || currentLines.some((l) => l.trim().length > 0)) {
    const { type, icon, badge } = classifySection(currentTitle)
    sections.push({
      id: `sec-${sectionIndex++}`,
      title: cleanTitle(currentTitle),
      type,
      icon,
      badge,
      lines: currentLines,
    })
  }

  // If no sections were identified, treat whole text as general
  if (sections.length === 0) {
    sections.push({
      id: 'sec-0',
      title: 'Sri Krishna’s Counsel',
      type: 'general',
      icon: '✦',
      badge: 'Grounded Guidance',
      lines: rawLines,
    })
  }

  return sections
}

function renderFormattedText(text: string, keyPrefix: string): React.ReactNode {
  // Regex to split by bold (**text**) and italic (*text*)
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  return (
    <span key={keyPrefix}>
      {tokens.map((token, i) => {
        if (token.startsWith('**') && token.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[#29251f]">
              {token.slice(2, -2)}
            </strong>
          )
        }
        if (token.startsWith('*') && token.endsWith('*')) {
          return (
            <em key={i} className="italic text-[#4a4034]">
              {token.slice(1, -1)}
            </em>
          )
        }
        return token
      })}
    </span>
  )
}

export default function AiAnswerDisplay({
  content,
  query,
  model = 'Gemini',
  onDismiss,
}: AiAnswerDisplayProps) {
  const [copied, setCopied] = useState(false)
  const sections = parseContentToSections(content)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <section className="overflow-hidden rounded-[26px] border border-[#dcd1c0] bg-[#fffdf8] shadow-[0_20px_50px_rgba(60,48,32,0.08)] animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#efe6d8] bg-gradient-to-r from-[#faf6ee] via-[#fffdf8] to-[#f4ebe0] px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-[28px] text-[#9b8e7d]">ॐ</span>
          <div>
            <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#8c7d69]">
              Sri Krishna’s Counsel • Grounded in the Gita
            </div>
            <h3 className="text-[20px] font-normal text-[#29251f] sm:text-[23px]">
              Guidance for: &ldquo;{query}&rdquo;
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy answer"
            aria-label="Copy guidance to clipboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ded5c7] bg-[#fffdf8] px-3 py-1.5 font-sans text-[11px] uppercase tracking-[1px] text-[#6d6356] transition hover:bg-[#f6f2ea] cursor-pointer"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <SpeechButton text={content} language="sa-IN" />

          {/* Dismiss button */}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss AI answer"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ded5c7] bg-[#fffdf8] text-[12px] text-[#6d6356] hover:bg-[#f3ece2] transition cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Styled Sections Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {sections.map((section) => {
          // Perspective Section Styling
          if (section.type === 'perspective') {
            return (
              <div
                key={section.id}
                className="rounded-[22px] border border-[#e8ded0] bg-[#faf6ee] p-5 sm:p-6"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dcd1c0] bg-[#fffdf8] px-3 py-1 font-sans text-[11px] uppercase tracking-[1.5px] text-[#8a7a66]">
                  <span>{section.icon}</span>
                  <span>{section.badge}</span>
                </div>

                <div className="font-sans text-[15px] leading-7 text-[#4d443a] space-y-3">
                  {section.lines
                    .filter((l) => l.trim().length > 0)
                    .map((line, idx) => (
                      <p key={idx}>{renderFormattedText(line, `persp-${idx}`)}</p>
                    ))}
                </div>
              </div>
            )
          }

          // Guiding Verse Section Styling
          if (section.type === 'verse') {
            const devanagariLines = section.lines.filter((l) => /[\u0900-\u097F]/.test(l))
            const otherLines = section.lines.filter((l) => !/[\u0900-\u097F]/.test(l) && l.trim().length > 0)

            return (
              <div
                key={section.id}
                className="rounded-[22px] border border-[#e8dfd2] bg-[linear-gradient(135deg,#f8f5f0_0%,#f4efe9_100%)] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#dcd1c0] bg-[#fffdf8] px-3 py-1 font-sans text-[11px] uppercase tracking-[1.5px] text-[#8a7a66]">
                    <span>{section.icon}</span>
                    <span>{section.badge}</span>
                  </span>

                  {devanagariLines.length > 0 && (
                    <SpeechButton
                      text={devanagariLines.join(' ')}
                      language="sa-IN"
                    />
                  )}
                </div>

                {devanagariLines.length > 0 && (
                  <blockquote className="sanskrit-verse mb-4 whitespace-pre-line text-[22px] leading-[1.8] text-[#2d261f] sm:text-[25px]">
                    {devanagariLines.map((l) => l.replace(/\*/g, '')).join('\n')}
                  </blockquote>
                )}

                <div className="font-sans text-[14px] leading-7 text-[#494037] space-y-2 border-t border-[#e5dcce] pt-3.5">
                  {otherLines.map((line, idx) => (
                    <div key={idx}>{renderFormattedText(line, `verse-${idx}`)}</div>
                  ))}
                </div>
              </div>
            )
          }

          // Practical Sadhana Section Styling
          if (section.type === 'sadhana') {
            const items = section.lines.filter((l) => l.trim().length > 0)

            return (
              <div
                key={section.id}
                className="rounded-[22px] border border-[#e8ded0] bg-[#fffdf8] p-5 sm:p-6"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dcd1c0] bg-[#fbf9f4] px-3 py-1 font-sans text-[11px] uppercase tracking-[1.5px] text-[#8a7a66]">
                  <span>{section.icon}</span>
                  <span>{section.badge}</span>
                </div>

                <div className="space-y-3 font-sans text-[14px] leading-6 text-[#574f47]">
                  {items.map((item, idx) => {
                    const isNumberedOrBulleted = /^(?:(?:\d+[.)])|[-*•])\s+/.test(item.trim())
                    const cleanedItem = item.replace(/^(?:(?:\d+[.)])|[-*•])\s+/, '')

                    return (
                      <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#efe7dc] bg-[#fbf9f5] p-3.5 sm:p-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#302b24] text-[11px] font-medium text-[#fffdf8]">
                          {isNumberedOrBulleted ? String(idx + 1).padStart(2, '0') : '✦'}
                        </span>
                        <div className="flex-1 leading-6">
                          {renderFormattedText(cleanedItem, `sadhana-${idx}`)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          // Closing Blessing Section Styling
          if (section.type === 'blessing') {
            return (
              <div
                key={section.id}
                className="rounded-[22px] border border-[#d8cdbc] bg-[#fbf8f2] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dcd1c0] bg-[#fffdf8] px-3 py-1 font-sans text-[11px] uppercase tracking-[1.5px] text-[#8a7a66]">
                  <span>{section.icon}</span>
                  <span>{section.badge}</span>
                </div>

                <div className="font-sans text-[14px] italic leading-7 text-[#574d41] space-y-2">
                  {section.lines
                    .filter((l) => l.trim().length > 0)
                    .map((line, idx) => (
                      <p key={idx}>{renderFormattedText(line, `bless-${idx}`)}</p>
                    ))}
                </div>
              </div>
            )
          }

          // General fallback styling
          return (
            <div
              key={section.id}
              className="rounded-[22px] border border-[#e2d8cb] bg-[#fffdf8] p-5 sm:p-6"
            >
              {section.title && (
                <h4 className="mb-3 text-[18px] font-normal text-[#29251f]">
                  {section.title}
                </h4>
              )}
              <div className="font-sans text-[14px] leading-7 text-[#4d443a] space-y-2">
                {section.lines
                  .filter((l) => l.trim().length > 0)
                  .map((line, idx) => (
                    <p key={idx}>{renderFormattedText(line, `gen-${idx}`)}</p>
                  ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-[#efe6d8] bg-[#fbf8f2] px-6 py-3.5 sm:px-8 font-sans text-[11px] text-[#8c8071]">
        <span>Grounded strictly on the 18 Chapters & 700 Verses of the Bhagavad Gita</span>
        <span className="uppercase tracking-[1px] font-medium">{model || 'Gemini AI'}</span>
      </div>
    </section>
  )
}
