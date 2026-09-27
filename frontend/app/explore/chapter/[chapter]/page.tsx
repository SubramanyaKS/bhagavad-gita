
import { API_BASE_URL } from '@/app/utils/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Verse = {
  id: string
  chapter: number
  verse: number
  sanskrit: {
    devanagari: string
  }
  transliteration: {
    iast: string
  }
  scripts: {
    kn: string
    te: string
    ta: string
    ml: string
    tcy: string
  }
}

type ApiResponse = {
  success: boolean
  data: Verse[]
}

const fetchVerses = async (
  chapterNumber: number
): Promise<ApiResponse | null> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/gita/chapters/${chapterNumber}/verses`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}

const ChapterPage = async ({
  params,
}: {
  params: Promise<{ chapter: string }>
}) => {
  const { chapter } = await params

  const chapterNumber = Number(chapter)

  if (!chapterNumber || Number.isNaN(chapterNumber)) {
    notFound()
  }

  const payload = await fetchVerses(chapterNumber)

  if (!payload || !payload.success || !Array.isArray(payload.data)) {
    notFound()
  }

  const chapterTitle = `Chapter ${chapterNumber}`

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[1.8px] text-[#7b7268] transition hover:text-[#29251f]"
        >
          ← Back to chapters
        </Link>
        <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#948979]">
          Bhagavad Gita
        </div>
      </div>

      <header className="mb-8 overflow-hidden rounded-[26px] border border-[#e0d9ce] bg-[#fffdf8] shadow-[0_18px_45px_rgba(60,48,32,0.06)]">
        <div className="border-b border-[#efe8df] bg-[#faf6ee] px-6 py-6 sm:px-8">
          <div className="mb-3 font-sans text-[11px] uppercase tracking-[2px] text-[#9a8d7c]">
            Chapter overview
          </div>
          <h1 className="text-[30px] text-[#29251f] sm:text-[38px]">{chapterTitle}</h1>
        </div>

        <div className="grid gap-4 px-6 py-5 sm:grid-cols-3 sm:px-8">
          <div className="rounded-[16px] border border-[#e9e0d4] bg-[#f7f4ee] p-4">
            <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
              Verses
            </div>
            <div className="mt-2 text-[28px] text-[#29251f]">{payload.data.length}</div>
          </div>
          <div className="rounded-[16px] border border-[#e9e0d4] bg-[#f7f4ee] p-4">
            <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
              Theme
            </div>
            <div className="mt-2 text-[18px] text-[#29251f]">Wisdom</div>
          </div>
          <div className="rounded-[16px] border border-[#e9e0d4] bg-[#f7f4ee] p-4">
            <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
              Path
            </div>
            <div className="mt-2 text-[18px] text-[#29251f]">Reflection</div>
          </div>
        </div>
      </header>

      <section className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[25px] font-normal text-[#29251f]">Verses</h2>
          <p className="mt-1 font-sans text-[12px] text-[#8b8174]">
            Read slowly and return to the teachings in your own time.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        {payload.data.map((item) => (
          <article
            key={item.id}
            className="rounded-[20px] border border-[#e0d9ce] bg-[#fffdf8] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#cfc6b8] hover:shadow-[0_12px_30px_rgba(60,48,32,0.07)] sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#efe8df] ">
              <div className="font-sans text-[11px] uppercase tracking-[1.8px] text-[#9a8d7c]">
                Verse {item.verse}
              </div>
              <Link
                href={`/explore/chapter/${chapterNumber}/verse/${item.verse}`}
                className="font-sans text-[12px] text-[#5f574c] transition hover:text-[#29251f]"
              >
                Read verse →
              </Link>
            </div>

            <p className="whitespace-pre-line text-[24px] text-[#2a241e] sm:text-[30px]">
              {item.sanskrit?.devanagari || 'The verse text is unavailable right now.'}
            </p>

            {item.transliteration?.iast ? (
              <p className="mt-4 border-t border-[#efe8df] pt-4 font-sans text-[14px] leading-7 text-[#574f47]">
                {item.transliteration.iast}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  )
}

export default ChapterPage
