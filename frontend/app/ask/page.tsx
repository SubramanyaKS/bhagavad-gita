import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import AskClient from './AskClient'

export const metadata: Metadata = {
  title: 'Ask the Gita — Timeless Answers for Modern Dilemmas',
  description:
    'Bring your real-world questions on fear, purpose, failure, relationships, and peace to the Bhagavad Gita and discover Krishna’s direct counsel.',
}

export default function AskPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      {/* Top Header */}
      <section className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mb-3 font-sans text-[11px] uppercase tracking-[2.5px] text-[#948979]">
          Ancient Wisdom • प्रश्नोत्तरम्
        </div>
        <h1 className="mb-3 text-[36px] font-normal text-[#29251f] sm:text-[46px]">
          Ask the Gita
        </h1>
        <p className="mx-auto max-w-xl font-sans text-[15px] leading-7 text-[#766e63]">
          Whatever dilemma you face — fear, heartbreak, confusion, or finding your purpose — the timeless dialogue between Krishna and Arjuna offers direct, clear guidance.
        </p>
      </section>

      {/* Interactive Search & Filter Client */}
      <Suspense
        fallback={
          <div className="flex h-60 items-center justify-center font-sans text-[14px] text-[#8c8072]">
            Loading teachings...
          </div>
        }
      >
        <AskClient />
      </Suspense>

      {/* Bottom CTA to Explore */}
      <section className="mt-16 rounded-[22px] border border-[#e0d9ce] bg-[#fffdf8] p-8 text-center sm:p-10">
        <div className="mb-3 text-[24px] text-[#9b8e7d]">ॐ</div>
        <h2 className="mb-2 text-[24px] font-normal text-[#29251f]">
          Prefer a structured course?
        </h2>
        <p className="mx-auto mb-6 max-w-md font-sans text-[13px] leading-6 text-[#81786d]">
          Take our 7-Day Foundations or explore the 4 Paths of Yoga in our guided learning module.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 rounded-xl bg-[#302b24] px-6 py-3 font-sans text-[13px] text-[#fffdf8] transition hover:bg-[#201d19]"
        >
          <span>Explore Guided Learning</span>
          <span>→</span>
        </Link>
      </section>
    </main>
  )
}
