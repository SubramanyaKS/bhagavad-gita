import Link from 'next/link'
import React from 'react'
import { prompts } from '../utils/utils'
import Om from './Om'

const HeroComponent = () => {
  return (
     <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-250 text-center">

          {/* Om */}
          <Om/>

          <div className="mb-4 font-sans text-[11px] uppercase tracking-[3px] text-[#9a8d7c]">
            The Bhagavad Gita
          </div>

          <h1 className="mx-auto max-w-190 text-[44px] font-normal leading-[1.12] tracking-[-1px] text-[#29251f] sm:text-[58px] lg:text-[68px]">
            Ancient wisdom
            <br />
            for modern life.
          </h1>

          <p className="mx-auto mt-6 max-w-142.5 font-sans text-[15px] leading-7 text-[#766e63]">
            Explore the timeless conversation between Krishna and Arjuna,
            understand its teachings, and find wisdom for the questions
            you face today.
          </p>

          {/* ASK BOX */}
          <div className="mx-auto mt-11 max-w-170 text-left">

            <div className="mb-3 text-center font-sans text-[11px] uppercase tracking-[1.8px] text-[#948979]">
              What is on your mind today?
            </div>

            <Link
              href="/ask"
              className="group flex min-h-16.5 items-center rounded-[14px] border border-[#d8d0c3] bg-[#fffdf8] px-5 shadow-[0_8px_30px_rgba(70,55,35,0.04)] transition hover:-translate-y-px hover:border-[#bfb5a6] hover:shadow-[0_12px_35px_rgba(70,55,35,0.08)] sm:px-6"
            >
              <span className="flex-1 font-sans text-[14px] text-[#91877b]">
                Ask about fear, purpose, work, relationships, peace...
              </span>

              <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#302b24] text-[16px] text-[#fffdf8] transition group-hover:translate-x-1">
                →
              </span>
            </Link>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {prompts.map((prompt) => (
                <Link
                  key={prompt}
                  href={`/ask?q=${encodeURIComponent(prompt)}`}
                  className="rounded-full border border-[#ddd6ca] bg-transparent px-3.5 py-2 font-sans text-[11px] text-[#71685d] transition hover:border-[#bfb5a6] hover:bg-[#fffdf8]"
                >
                  {prompt}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroComponent