export type Chapter = {
  number?: number | string;
  sanskrit?: string;
  name?: string;
  description?: string;
  verses?: number;
  search?: string;
  tags?: string[];
};

export type ChaptersProps = {
  initialChapters: Chapter[];
};

export type VersePayload = {
  success?: boolean
  data?: {
    chapter?: number | string
    verse_count?: number
    name?: {
      sa?: string
      kn?: string
      ml?: string
      te?: string
      ta?: string
      hi?: string
      en?: string
      iast?: string
    }
    verses?: {
      id?: string
      chapter?: number | string
      verse?: number | string
      sloka?: string
      translation?: string
      transliteration?: string
      meaning?: string
      explanation?: string
      scripts?: Record<string, string | undefined>
    }
  }
  verse?: {
    chapter?: number | string
    verse?: number | string
    sloka?: string
    translation?: string
    transliteration?: string
    meaning?: string
    explanation?: string
    scripts?: Record<string, string | undefined>
  }
  verses?: {
    chapter?: number | string
    verse?: number | string
    sloka?: string
    translation?: string
    transliteration?: string
    meaning?: string
    explanation?: string
    scripts?: Record<string, string | undefined>
  }
}