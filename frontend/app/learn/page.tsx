import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import LearnClient from './LearnClient'

export const metadata: Metadata = {
  title: 'Learn Gita — Guided Pathways Through the Bhagavad Gita',
  description:
    'Explore curated structured pathways through the Bhagavad Gita: The 7-Day Journey, The 4 Paths of Yoga, and Krishna’s guidance on modern life dilemmas.',
}

export default function LearnPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      {/* Top Header */}
      <section className="mx-auto mb-12 max-w-2xl text-center">
        <div className="mb-3 font-sans text-[11px] uppercase tracking-[2.5px] text-[#948979]">
          Sacred Pathways • स्वाध्यायः
        </div>
        <h1 className="mb-3 text-[36px] font-normal text-[#29251f] sm:text-[46px]">
          Learn the Gita
        </h1>
        <p className="mx-auto max-w-xl font-sans text-[15px] leading-7 text-[#766e63]">
          700 verses organized into clear, guided pathways. Understand Krishna’s core teachings on action, identity, mind mastery, and inner peace.
        </p>
      </section>

      {/* Main Interactive Learning Client */}
      <LearnClient />

      {/* Bottom Exploration Banner */}
      <section className="mt-16 rounded-[22px] border border-[#e0d9ce] bg-[#fffdf8] p-8 text-center sm:p-10">
        <div className="mb-3 text-[24px] text-[#9b8e7d]">ॐ</div>
        <h2 className="mb-2 text-[24px] font-normal text-[#29251f]">
          Ready to dive into the original verses?
        </h2>
        <p className="mx-auto mb-6 max-w-md font-sans text-[13px] leading-6 text-[#81786d]">
          Read all 18 chapters sequentially with original Sanskrit, transliterations, and audio recitations.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 rounded-xl bg-[#302b24] px-6 py-3 font-sans text-[13px] text-[#fffdf8] transition hover:bg-[#201d19]"
        >
          <span>Explore All 18 Chapters</span>
          <span>→</span>
        </Link>
      </section>
    </main>
  )
}
