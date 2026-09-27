import { VersePayload } from './types'

const asString = (value: unknown) => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  return undefined
}

const asNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const getNameValue = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const record = value as Record<string, unknown>

  return {
    sa: asString(record.sa) ?? asString(record.sanskrit) ?? asString(record.iast) ?? asString(record.english),
    kn: asString(record.kn),
    te: asString(record.te),
    ml: asString(record.ml),
    ta: asString(record.ta),
  }
}

const getScriptsValue = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const record = value as Record<string, unknown>

  return {
    sa: asString(record.sa),
    kn: asString(record.kn),
    te: asString(record.te),
    ml: asString(record.ml),
    ta: asString(record.ta),
    hi: asString(record.hi),
  }
}

const getVerseValue = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const record = value as Record<string, unknown>
  const scripts = getScriptsValue(record.scripts)

  return {
    id: asString(record.id),
    chapter: asNumber(record.chapter),
    verse: asNumber(record.verse),
    sloka: asString(record.sloka),
    translation: asString(record.translation) ?? asString(record.meaning) ?? asString(record.explanation),
    transliteration: asString(record.transliteration),
    meaning: asString(record.meaning),
    explanation: asString(record.explanation),
    scripts,
  }
}

export const resolveChapters = (payload: unknown) => {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { chapters?: unknown })?.chapters)
      ? (payload as { chapters: unknown[] }).chapters
      : Array.isArray((payload as { data?: unknown })?.data)
        ? (payload as { data: unknown[] }).data
        : []

  return items.map((item: any) => {
    const chapterNumber = Number(item?.chapter ?? item?.number ?? 0)
    const chapterName = typeof item?.name === 'string'
      ? item.name
      : item?.name?.english ?? item?.name?.iast ?? item?.name?.sanskrit ?? `Chapter ${chapterNumber}`

    return {
      number: chapterNumber,
      sanskrit: typeof item?.name === 'object' ? (item.name?.sanskrit ?? item.name?.iast ?? '') : chapterName,
      name: chapterName,
      description: item?.description ?? '',
      verses: Number(item?.verse_count ?? item?.verses ?? 0),
      search: item?.search ?? `${chapterName} ${item?.description ?? ''}`,
      tags: Array.isArray(item?.tags) ? item.tags.map((tag: unknown) => String(tag).toLowerCase()) : [],
    }
  })
}

export const getVersePayload = (payload: unknown): VersePayload => {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  const record = payload as Record<string, unknown>
  const data = (record.data && typeof record.data === 'object' ? record.data : record) as Record<string, unknown>
  const rawVerses = data.verses ?? record.verses ?? record.verse ?? data.verse ?? data
  const chapter = asNumber(data.chapter ?? (typeof rawVerses === 'object' && rawVerses ? (rawVerses as Record<string, unknown>).chapter : undefined))
  const payloadName = getNameValue(data.name ?? record.name)
  const verseData = getVerseValue(rawVerses)

  const normalizedVerse = {
    chapter,
    verse: asNumber(verseData?.verse ?? record.verse ?? data.verse),
    sloka: verseData?.sloka ?? asString(record.sloka),
    translation: verseData?.translation ?? asString(record.translation),
    transliteration: verseData?.transliteration ?? asString(record.transliteration),
    meaning: verseData?.meaning ?? asString(record.meaning),
    explanation: verseData?.explanation ?? asString(record.explanation),
    scripts: verseData?.scripts,
  }

  const safeName = payloadName ?? {
    sa: asString((data.name as Record<string, unknown>)?.sa) ?? asString((record.name as Record<string, unknown>)?.sa),
  }

  return {
    success: Boolean(record.success),
    data: {
      chapter,
      name: safeName,
      verses: {
        id: verseData?.id,
        chapter,
        verse: normalizedVerse.verse,
        sloka: normalizedVerse.sloka,
        translation: normalizedVerse.translation,
        transliteration: normalizedVerse.transliteration,
        meaning: normalizedVerse.meaning,
        explanation: normalizedVerse.explanation,
        scripts: normalizedVerse.scripts,
      },
    },
    verse: {
      chapter,
      verse: normalizedVerse.verse,
      sloka: normalizedVerse.sloka,
      translation: normalizedVerse.translation,
      transliteration: normalizedVerse.transliteration,
      meaning: normalizedVerse.meaning,
      explanation: normalizedVerse.explanation,
      scripts: normalizedVerse.scripts,
    },
    verses: {
      chapter,
      verse: normalizedVerse.verse,
      sloka: normalizedVerse.sloka,
      translation: normalizedVerse.translation,
      transliteration: normalizedVerse.transliteration,
      meaning: normalizedVerse.meaning,
      explanation: normalizedVerse.explanation,
      scripts: normalizedVerse.scripts,
    },
  }
}
