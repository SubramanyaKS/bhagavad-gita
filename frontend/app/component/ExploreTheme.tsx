import Link from 'next/link'
import React from 'react'

const ExploreTheme = () => {
  return (
    <section className="border-y border-[#e1dbd0] bg-[#faf8f3]">
        <div className="mx-auto max-w-250 px-4 py-16 text-center sm:px-6">

          <div className="mb-3 font-sans text-[10px] uppercase tracking-[2.5px] text-[#9a8d7c]">
            Explore by theme
          </div>

          <h2 className="mb-8 text-[29px] font-normal text-[#29251f]">
            What are you seeking?
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Dharma",
              "Karma",
              "Purpose",
              "Fear",
              "Peace",
              "Devotion",
              "Knowledge",
              "Detachment",
              "The Self",
            ].map((theme) => (
              <Link
                key={theme}
                href={`/ask?theme=${encodeURIComponent(theme)}`}
                className="rounded-full border border-[#d9d1c4] px-5 py-2.5 font-sans text-[12px] text-[#665d52] transition hover:border-[#aaa092] hover:bg-[#fffdf8]"
              >
                {theme}
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export default ExploreTheme