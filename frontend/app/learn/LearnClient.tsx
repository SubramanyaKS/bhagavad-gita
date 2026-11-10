'use client'

import React, { useState, useSyncExternalStore } from 'react'
import LessonModal from '@/app/component/LessonModal'
import { LEARN_TRACKS, Lesson, Track } from './learnData'

const subscribeToCompleted = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  window.addEventListener('gita_completed_changed', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('gita_completed_changed', callback)
  }
}

const getCompletedSnapshot = (): string => {
  if (typeof window === 'undefined') return '[]'
  return localStorage.getItem('gita_completed_lessons') || '[]'
}

export default function LearnClient() {
  const completedJson = useSyncExternalStore(
    subscribeToCompleted,
    getCompletedSnapshot,
    () => '[]',
  )
  const completedIds: string[] = React.useMemo(() => {
    try {
      return JSON.parse(completedJson)
    } catch {
      return []
    }
  }, [completedJson])

  const [activeTrackId, setActiveTrackId] = useState<string>(LEARN_TRACKS[0].id)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const activeTrack: Track =
    LEARN_TRACKS.find((t) => t.id === activeTrackId) ?? LEARN_TRACKS[0]

  const totalLessonsCount = LEARN_TRACKS.reduce(
    (acc, t) => acc + t.lessons.length,
    0,
  )
  const totalCompletedCount = completedIds.length
  const progressPercent = Math.round(
    (totalCompletedCount / Math.max(1, totalLessonsCount)) * 100,
  )

  const toggleComplete = (lessonId: string) => {
    let next: string[]
    if (completedIds.includes(lessonId)) {
      next = completedIds.filter((id) => id !== lessonId)
    } else {
      next = [...completedIds, lessonId]
    }
    localStorage.setItem('gita_completed_lessons', JSON.stringify(next))
    window.dispatchEvent(new Event('gita_completed_changed'))
  }

  return (
    <div className="space-y-10">
      {/* Overall Progress Banner */}
      <section className="overflow-hidden rounded-[24px] border border-[#e0d9ce] bg-[#fffdf8] p-6 shadow-[0_12px_35px_rgba(60,48,32,0.05)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#9a8d7c]">
              Your Learning Journey • स्वाध्यायः
            </div>
            <h2 className="mt-1 text-[24px] font-normal text-[#29251f]">
              {totalCompletedCount} of {totalLessonsCount} Lessons Completed
            </h2>
          </div>
          <div className="font-sans text-[20px] font-medium text-[#302b24]">
            {progressPercent}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#f1ede4]">
          <div
            className="h-full rounded-full bg-[#302b24] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Track Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e5dccd] pb-4">
        {LEARN_TRACKS.map((track) => {
          const isSelected = track.id === activeTrack.id
          const trackCompleted = track.lessons.filter((l) =>
            completedIds.includes(l.id),
          ).length

          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveTrackId(track.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13px] transition cursor-pointer ${
                isSelected
                  ? 'bg-[#302b24] text-[#fffdf8] shadow-[0_4px_14px_rgba(48,43,36,0.15)]'
                  : 'border border-[#ded6c9] bg-[#fffdf8] text-[#6d6356] hover:border-[#b8aa96] hover:bg-[#f6f2ea]'
              }`}
            >
              <span>{track.icon}</span>
              <span className="font-medium">{track.title}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-[#fffdf8]'
                    : 'bg-[#ede6da] text-[#716557]'
                }`}
              >
                {trackCompleted}/{track.lessons.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Track Header */}
      <section className="rounded-[24px] border border-[#e2d8cb] bg-[#faf6ee] p-6 sm:p-8">
        <div className="mb-2 font-sans text-[11px] uppercase tracking-[2px] text-[#9a8d7c]">
          {activeTrack.sanskritTitle}
        </div>
        <h3 className="text-[28px] font-normal text-[#29251f] sm:text-[32px]">
          {activeTrack.title}
        </h3>
        <p className="mt-2 max-w-2xl font-sans text-[14px] leading-6 text-[#73685a]">
          {activeTrack.description}
        </p>
      </section>

      {/* Lesson Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {activeTrack.lessons.map((lesson, idx) => {
          const isDone = completedIds.includes(lesson.id)

          return (
            <article
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`group flex flex-col justify-between rounded-[22px] border p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(60,48,32,0.08)] cursor-pointer ${
                isDone
                  ? 'border-[#cfe0c7] bg-[#fcfffa]'
                  : 'border-[#e0d9ce] bg-[#fffdf8] hover:border-[#cfc6b8]'
              }`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#9a8d7c]">
                    Lesson {String(idx + 1).padStart(2, '0')} • {lesson.duration}
                  </span>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#86a877] bg-[#f0f6ec] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#3b5b2e]">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="font-sans text-[11px] text-[#b0a392]">
                      Not started
                    </span>
                  )}
                </div>

                <h4 className="text-[21px] font-normal text-[#29251f] group-hover:text-[#181614]">
                  {lesson.title}
                </h4>

                <p className="mt-1 font-sans text-[12px] font-medium uppercase tracking-[1px] text-[#8c7d69]">
                  {lesson.subtitle}
                </p>

                <p className="mt-3 font-sans text-[13px] leading-6 text-[#73685a] line-clamp-3">
                  {lesson.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#ede6da] pt-4">
                <span className="font-sans text-[11px] text-[#938677]">
                  {lesson.keyVerses.length} core verse{lesson.keyVerses.length > 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center gap-1 font-sans text-[12px] font-medium text-[#5a4f42] group-hover:text-[#29251f]">
                  <span>{isDone ? 'Review Lesson' : 'Start Lesson'}</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Lesson Reader Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          track={activeTrack}
          isCompleted={completedIds.includes(selectedLesson.id)}
          onToggleComplete={toggleComplete}
          onClose={() => setSelectedLesson(null)}
          onSelectLesson={(nextLesson) => setSelectedLesson(nextLesson)}
        />
      )}
    </div>
  )
}
