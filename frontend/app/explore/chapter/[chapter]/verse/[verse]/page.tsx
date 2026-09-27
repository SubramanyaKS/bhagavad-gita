import SpeechButton from '@/app/component/SpeechButton'
import { getVersePayload } from '@/app/utils/service'
import { API_BASE_URL } from '@/app/utils/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

const getSafeText = (...values: Array<string | undefined>) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0)

const fetchVerseByNumber = async (chapterNumber: number, verseNumber: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/gita/chapters/${chapterNumber}/verses/${verseNumber}?language=kannada`,
    {
      next: { revalidate: 3600 },
      cache: 'force-cache',
    },
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}

const SlokaPage = async ({ params }: { params: Promise<{ chapter: string; verse: string }> }) => {
  const { chapter, verse } = await params
  const chapterNumber = Number(chapter)
  const verseNumber = Number(verse)

  if (!chapterNumber || !verseNumber || Number.isNaN(chapterNumber) || Number.isNaN(verseNumber)) {
    notFound()
  }

  const payload = await fetchVerseByNumber(chapterNumber, verseNumber)

  if (!payload) {
    notFound()
  }

  const resolvedPayload = getVersePayload(payload)
  const chapterName =
    getSafeText(
      resolvedPayload.data?.name?.sa,
      resolvedPayload.data?.name?.kn,
      `Chapter ${chapterNumber}`,
    ) ?? `Chapter ${chapterNumber}`

  const verseData = resolvedPayload.data?.verses ?? resolvedPayload.verse ?? resolvedPayload.verses
  const verseScripts = (verseData as { scripts?: Record<string, string | undefined> } | undefined)?.scripts ?? {}
  const sloka =
    getSafeText(
      verseData?.sloka,
      verseScripts.sa,
      verseScripts.kn,
    ) ?? 'The verse text is unavailable right now.'

  const translation = getSafeText(
    verseData?.translation,
    verseData?.meaning,
    verseData?.explanation,
  )
  const transliteration = getSafeText(verseData?.transliteration, verseScripts.kn, verseScripts.sa)
  const previousVerse = Math.max(1, verseNumber - 1)
  const nextVerse = verseNumber + 1

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[1.8px] text-[#7b7268] transition hover:text-[#29251f]"
        >
          ← Back to chapters
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#e5dccd] bg-[#fffdf8]/80 px-3 py-1.5 font-sans text-[11px] uppercase tracking-[2px] text-[#7d6f62] shadow-[0_8px_24px_rgba(60,48,32,0.04)]">
          <span className="h-2 w-2 rounded-full bg-[#c8a060]" />
          Bhagavad Gita
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
        <article className="overflow-hidden rounded-[30px] border border-[#e5dccd] bg-[#fffdf8] shadow-[0_25px_70px_rgba(73,58,35,0.10)]">
          <header className="border-b border-[#efe4d4] bg-gradient-to-r from-[#f7f0e5] via-[#fffdf8] to-[#f2e7d7] px-5 py-6 sm:px-8 sm:py-7">
            <div className="mb-3 font-sans text-[11px] uppercase tracking-[2.4px] text-[#9a8d7c]">
              Chapter {chapterNumber} • Verse {verseNumber}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 font-sans text-[11px] uppercase tracking-[1.8px] text-[#8c7d69]">
                  Sacred teaching
                </p>
                <h1 className="text-[28px] leading-tight text-[#29251f] sm:text-[36px]">{chapterName}</h1>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#dcd1c0] bg-[#fffdf8] px-3 py-2 font-sans text-[11px] uppercase tracking-[1.8px] text-[#675d52]">
                <span className="text-[#b78952]">✦</span>
                Verse {verseNumber}
              </div>
            </div>
          </header>

          <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
            <section className="rounded-[22px] border border-[#e8dfd2] bg-[linear-gradient(135deg,#f8f5f0_0%,#f4efe9_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="font-sans text-[11px] uppercase tracking-[2px] text-[#8c7e6a]">
                  Original Sanskrit
                </div>
                <SpeechButton text={sloka} language="kn-IN" />
              </div>

              <blockquote className="sanskrit-verse whitespace-pre-line text-[28px] leading-[1.9] text-[#2d261f] sm:text-[34px]">
                {sloka}
              </blockquote>
            </section>

            {transliteration ? (
              <section className="rounded-[20px] border border-[#e9e0d4] bg-[#fffdf8] p-5 sm:p-6">
                <div className="mb-3 font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
                  Transliteration
                </div>
                <p className="font-sans text-[15px] leading-7 text-[#574f47]">{transliteration}</p>
              </section>
            ) : null}

            {translation ? (
              <section className="rounded-[20px] border border-[#e9e0d4] bg-[#fffdf8] p-5 sm:p-6">
                <div className="mb-3 font-sans text-[11px] uppercase tracking-[1.8px] text-[#8d8175]">
                  Translation
                </div>
                <p className="font-sans text-[16px] leading-8 text-[#4f483f]">{translation}</p>
              </section>
            ) : null}
          </div>
        </article>

        <aside className="space-y-6">
          <section className="rounded-[24px] border border-[#e6dcc9] bg-[#fffdf8] p-5 shadow-[0_14px_30px_rgba(60,48,32,0.04)]">
            <div className="mb-4 font-sans text-[11px] uppercase tracking-[2px] text-[#8d8175]">
              Verse insight
            </div>

            <div className="space-y-4">
              <div className="rounded-[16px] border border-[#ece1d1] bg-[#f8f3ea] p-4">
                <div className="font-sans text-[10px] uppercase tracking-[1.8px] text-[#8f7d69]">
                  Theme
                </div>
                <p className="mt-2 text-[18px] text-[#2d261f]">Wisdom & devotion</p>
              </div>

              <div className="rounded-[16px] border border-[#ece1d1] bg-[#f8f3ea] p-4">
                <div className="font-sans text-[10px] uppercase tracking-[1.8px] text-[#8f7d69]">
                  Reflection
                </div>
                <p className="mt-2 text-[15px] leading-6 text-[#544d44]">
                  Read slowly. Let each line settle before moving to the next teaching.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#e6dcc9] bg-[#fffdf8] p-5 shadow-[0_14px_30px_rgba(60,48,32,0.04)]">
            <div className="mb-4 font-sans text-[11px] uppercase tracking-[2px] text-[#8d8175]">
              Navigate
            </div>

            <div className="space-y-3">
              <Link
                href={`/explore/chapter/${chapterNumber}/verse/${previousVerse}`}
                className="flex items-center justify-between rounded-[14px] border border-[#e3d9cb] bg-[#f9f5ef] px-4 py-3 font-sans text-[12px] uppercase tracking-[1.5px] text-[#5a5048] transition hover:border-[#cdbfa8] hover:bg-[#f3ede3]"
              >
                <span>Previous</span>
                <span>←</span>
              </Link>

              <Link
                href={`/explore/chapter/${chapterNumber}/verse/${nextVerse}`}
                className="flex items-center justify-between rounded-[14px] bg-[#2d261f] px-4 py-3 font-sans text-[12px] uppercase tracking-[1.5px] text-[#fffdf8] transition hover:bg-[#201d1a]"
              >
                <span>Next</span>
                <span>→</span>
              </Link>

              <Link
                href={`/explore/chapter/${chapterNumber}`}
                className="flex items-center justify-center rounded-[14px] border border-[#d9d0c3] bg-[#fffdf8] px-4 py-3 font-sans text-[12px] uppercase tracking-[1.5px] text-[#5d554b] transition hover:border-[#b8a993] hover:bg-[#f4efe8]"
              >
                Chapter overview
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default SlokaPage
