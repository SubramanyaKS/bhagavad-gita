import React from 'react'
import Link from 'next/link'
import Chapters from './Chapters'
import { resolveChapters } from '../utils/service'
import { API_BASE_URL, chapters as staticChapters } from '../utils/utils'

const fetchChapters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/gita/chapters`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return resolveChapters(staticChapters)
    }

    const payload = await response.json()
    return resolveChapters(payload)
  } catch {
    return resolveChapters(staticChapters)
  }
}

const page = async () => {
  const initialChapters = await fetchChapters()

  return (
   <main className="mx-auto w-full max-w-280 px-4 pb-24 pt-15 sm:px-6 lg:px-8 xl:px-0">
      <section className="mx-auto mb-13.75 max-w-195 text-center">
        <div className="mb-3 font-sans text-[11px] uppercase tracking-[2px] text-[#948979]">
          The Bhagavad Gita
        </div>
        <h1 className="mb-2.5 text-[34px] font-normal text-[#29251f] sm:text-[42px]">
          Explore the Gita
        </h1>
        <p className="mx-auto max-w-150 font-sans text-[15px] text-[#766e63]">
          18 chapters. 700 verses. One timeless conversation between Krishna and Arjuna.
        </p>
      </section>
      <Chapters initialChapters={initialChapters} />
      <section className="mt-18.75 rounded-[18px] border border-[#e0d9ce] bg-[#fffdf8] p-8 text-center sm:p-10">
        <h2 className="mb-2 text-[25px] font-normal text-[#29251f]">Not sure where to begin?</h2>
        <p className="mx-auto mb-6 max-w-140 font-sans text-[13px] text-[#81786d]">
          Start a guided journey through the essential teachings of the Bhagavad Gita.
        </p>
        <Link
          href="/learn"
          className="inline-block rounded-lg bg-[#302b24] px-5 py-3 font-sans text-[13px] text-[#fffdf8] transition hover:bg-[#221f1b]"
        >
          Start Learning
        </Link>
      </section>
    </main>
  )
}

export default page