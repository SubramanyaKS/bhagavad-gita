import Link from 'next/link'
import React from 'react'

const VerseofDay = () => {
  return (
     <section className="border-y border-[#e1dbd0] bg-[#f1ede4]">
        <div className="mx-auto max-w-225 px-4 py-16 text-center sm:px-6">

          <div className="mb-3 font-sans text-[10px] uppercase tracking-[2.5px] text-[#9a8d7c]">
            Verse of the day
          </div>

          <div className="mb-5 font-sans text-[11px] text-[#9a8d7c]">
            Bhagavad Gita · Chapter 2 · Verse 47
          </div>

          <div className="mx-auto max-w-175 text-[29px] leading-[1.8] text-[#302b24] sm:text-[35px]">
            कर्मण्येवाधिकारस्ते
            <br />
            मा फलेषु कदाचन
          </div>

          <div className="mx-auto mt-7 max-w-130 font-sans text-[14px] leading-7 text-[#756d62]">
            You have a right to your actions,
            <br className="hidden sm:block" />
            but not to the fruits of your actions.
          </div>

          <Link
            href="/explore/chapter/2/verse/47"
            className="mt-7 inline-flex items-center gap-2 font-sans text-[12px] text-[#5d554b] underline decoration-[#bdb4a7] underline-offset-4 transition hover:text-[#29251f]"
          >
            Read and reflect
            <span>→</span>
          </Link>
        </div>
      </section>
  )
}

export default VerseofDay