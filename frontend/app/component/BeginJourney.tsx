import Link from 'next/link'
import React from 'react'

const BeginJourney = () => {
  return (
     <section className="mx-auto max-w-200 px-4 py-24 text-center sm:px-6">

        <div className="mb-5 text-[28px] text-[#9b8e7d]">
          ॐ
        </div>

        <h2 className="text-[31px] font-normal text-[#29251f] sm:text-[38px]">
          Begin your journey.
        </h2>

        <p className="mx-auto mt-4 max-w-125 font-sans text-[13px] leading-6 text-[#81786d]">
          Whether you are discovering the Gita for the first time or
          returning to a familiar verse, there is always something new
          to understand.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/explore"
            className="rounded-lg bg-[#302b24] px-6 py-3 font-sans text-[12px] text-[#fffdf8] transition hover:bg-[#211e1a]"
          >
            Explore the Gita
          </Link>

          <Link
            href="/ask"
            className="rounded-lg border border-[#d5cec2] bg-[#fffdf8] px-6 py-3 font-sans text-[12px] text-[#514a42] transition hover:border-[#aaa092]"
          >
            Ask the Gita
          </Link>
        </div>
      </section>
  )
}

export default BeginJourney