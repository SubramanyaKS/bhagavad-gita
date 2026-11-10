'use client'

import React from 'react'
import Link from 'next/link'
import SpeechButton from './SpeechButton'
import { Lesson, Track } from '@/app/learn/learnData'

type LessonModalProps = {
  lesson: Lesson
  track: Track
  isCompleted: boolean
  onToggleComplete: (lessonId: string) => void
  onClose: () => void
  onSelectLesson: (lesson: Lesson) => void
}

export default function LessonModal({
  lesson,
  track,
  isCompleted,
  onToggleComplete,
  onClose,
  onSelectLesson,
}: LessonModalProps) {
  const currentIndex = track.lessons.findIndex((l) => l.id === lesson.id)
  const previousLesson = currentIndex > 0 ? track.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < track.lessons.length - 1 ? track.lessons[currentIndex + 1] : null

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[26px] border border-[#e2d8cb] bg-[#fffdf8] shadow-[0_25px_70px_rgba(40,32,20,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ece4d6] bg-[#fbf8f2] px-6 py-5 sm:px-8">
          <div>
            <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#9a8d7c]">
              {track.title} • {lesson.duration}
            </div>
            <h2 className="mt-1 text-[22px] font-normal text-[#29251f] sm:text-[26px]">
              {lesson.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lesson"
            className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#ded5c7] bg-[#fffdf8] text-[#6d6356] transition hover:bg-[#f3ece2] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-7">
          {/* Subtitle & Summary */}
          <div>
            <div className="mb-2 font-sans text-[13px] font-medium uppercase tracking-[1.5px] text-[#8c7d69]">
              {lesson.subtitle}
            </div>
            <p className="font-sans text-[15px] leading-7 text-[#574f47]">
              {lesson.summary}
            </p>
          </div>

          {/* Key Verses */}
          {lesson.keyVerses.map((kv) => (
            <div
              key={`${kv.chapter}-${kv.verse}`}
              className="rounded-[22px] border border-[#e8dfd2] bg-[linear-gradient(135deg,#f8f5f0_0%,#f4efe9_100%)] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8c7e6a]">
                  Chapter {kv.chapter} · Verse {kv.verse}
                </span>
                <SpeechButton text={kv.sanskrit} language="sa-IN" />
              </div>

              <blockquote className="sanskrit-verse whitespace-pre-line text-[22px] leading-[1.8] text-[#2d261f] sm:text-[26px]">
                {kv.sanskrit}
              </blockquote>

              <p className="mt-3 font-sans text-[13px] italic leading-6 text-[#73685a]">
                {kv.iast}
              </p>

              <div className="mt-4 border-t border-[#e5dcce] pt-3 font-sans text-[14px] leading-7 text-[#4d453d]">
                <span className="font-semibold text-[#29251f]">Meaning: </span>
                {kv.translation}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#e5dcce] pt-3">
                <span className="font-sans text-[12px] text-[#8d8071]">{kv.context}</span>
                <Link
                  href={`/explore/chapter/${kv.chapter}/verse/${kv.verse}`}
                  className="font-sans text-[12px] text-[#63584a] underline decoration-[#c7baa8] underline-offset-4 hover:text-[#29251f]"
                >
                  Read full verse →
                </Link>
              </div>
            </div>
          ))}

          {/* Core Takeaways */}
          <div className="rounded-[20px] border border-[#e8ded0] bg-[#fffdf8] p-5 sm:p-6">
            <h3 className="mb-3 font-sans text-[12px] uppercase tracking-[2px] text-[#8c7d69]">
              Core Wisdom Takeaways
            </h3>
            <ul className="space-y-2.5 font-sans text-[14px] leading-6 text-[#574f47]">
              {lesson.coreTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-[#b78952]">✦</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Daily Reflection */}
          <div className="rounded-[20px] border border-[#d8cdbc] bg-[#faf5ec] p-5 sm:p-6">
            <div className="mb-2 font-sans text-[11px] uppercase tracking-[2px] text-[#93826e]">
              Daily Reflection / अभ्यास
            </div>
            <p className="font-sans text-[14px] leading-7 text-[#574d41] italic">
              &ldquo;{lesson.practicalReflection}&rdquo;
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-3 border-t border-[#ece4d6] bg-[#fbf8f2] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {/* Mark Complete */}
          <button
            type="button"
            onClick={() => onToggleComplete(lesson.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-sans text-[13px] font-medium transition cursor-pointer ${
              isCompleted
                ? 'border border-[#728f65] bg-[#edf4ea] text-[#3b5b2e]'
                : 'border border-[#ded5c7] bg-[#fffdf8] text-[#5a5044] hover:bg-[#f6efe4]'
            }`}
          >
            <span>{isCompleted ? '✓ Completed' : '○ Mark as Completed'}</span>
          </button>

          {/* Previous / Next Lesson */}
          <div className="flex items-center gap-2">
            {previousLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(previousLesson)}
                className="rounded-xl border border-[#ded5c7] bg-[#fffdf8] px-3.5 py-2 font-sans text-[12px] text-[#625648] transition hover:bg-[#f6efe4] cursor-pointer"
              >
                ← Previous
              </button>
            )}
            {nextLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(nextLesson)}
                className="rounded-xl bg-[#302b24] px-4 py-2 font-sans text-[12px] text-[#fffdf8] transition hover:bg-[#201d19] cursor-pointer"
              >
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
