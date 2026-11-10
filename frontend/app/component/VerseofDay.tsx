import React from 'react'
import Link from 'next/link'
import SpeechButton from './SpeechButton'

type DailyVerse = {
  chapter: number
  verse: number
  sanskrit: string
  translation: string
  theme: string
}

const DAILY_VERSES: DailyVerse[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।',
    translation: 'You have a right to your actions, but never to the fruits of your actions. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
    theme: 'Karma & Action',
  },
  {
    chapter: 2,
    verse: 70,
    sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी।।',
    translation: 'As the ocean remains calm and undisturbed while endless waters flow into it, so the person into whom all desires enter without creating disturbance attains true peace.',
    theme: 'Inner Peace',
  },
  {
    chapter: 2,
    verse: 14,
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत।।',
    translation: 'Sensory experiences of cold, heat, pleasure, and pain come and go; they are temporary. Learn to endure them with an undisturbed heart.',
    theme: 'Equanimity',
  },
  {
    chapter: 4,
    verse: 38,
    sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति।।',
    translation: 'Certainly, there is nothing in this world as purifying as knowledge. One who is perfected in selfless action realizes it naturally within oneself in due course.',
    theme: 'Wisdom',
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।।',
    translation: 'Lift yourself by your own mind, and do not degrade yourself. For the mind alone is your greatest friend, and the mind alone is your greatest enemy.',
    theme: 'Self-Mastery',
  },
  {
    chapter: 6,
    verse: 26,
    sanskrit: 'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्।।',
    translation: 'From wherever the restless and unsteady mind wanders away, gently restrain it and bring it back under the guidance of the Self.',
    theme: 'Mindfulness',
  },
  {
    chapter: 7,
    verse: 7,
    sanskrit: 'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव।।',
    translation: 'There is nothing higher than Me in all existence. All this universe is woven into Me, like clusters of pearls strung upon a single thread.',
    theme: 'Divine Unity',
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्।।',
    translation: 'For those who meditate upon Me with undivided devotion, I personally provide what they lack and protect what they have.',
    theme: 'Devotion & Grace',
  },
  {
    chapter: 12,
    verse: 13,
    sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी।।',
    translation: 'One who has no ill will toward any living being, who is friendly and compassionate, free from possessiveness and ego, patient and balanced in joy and sorrow.',
    theme: 'Compassion',
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।',
    translation: 'Relinquishing all dualities and anxieties of ego, take refuge in Me alone. I shall liberate you from all fears; grieve no more.',
    theme: 'Surrender & Liberation',
  },
]

function getDailyVerse(): DailyVerse {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const index = Math.abs(dayOfYear) % DAILY_VERSES.length
  return DAILY_VERSES[index]
}

export default function VerseofDay() {
  const verse = getDailyVerse()

  return (
    <section className="border-y border-[#e1dbd0] bg-[#f1ede4]">
      <div className="mx-auto max-w-225 px-4 py-16 text-center sm:px-6">
        <div className="mb-3 font-sans text-[10px] uppercase tracking-[2.5px] text-[#9a8d7c]">
          Verse of the Day • {verse.theme}
        </div>

        <div className="mb-5 font-sans text-[11px] text-[#9a8d7c]">
          Bhagavad Gita · Chapter {verse.chapter} · Verse {verse.verse}
        </div>

        <blockquote className="sanskrit-verse mx-auto max-w-185 whitespace-pre-line text-[26px] leading-[1.8] text-[#302b24] sm:text-[32px]">
          {verse.sanskrit}
        </blockquote>

        <div className="mx-auto mt-6 max-w-150 font-sans text-[14px] leading-7 text-[#756d62]">
          {verse.translation}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SpeechButton text={verse.sanskrit} language="sa-IN" />
          <Link
            href={`/explore/chapter/${verse.chapter}/verse/${verse.verse}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#d2c8b8] bg-[#fffdf8] px-4 py-2 font-sans text-[12px] text-[#5d554b] transition hover:border-[#b4a694] hover:text-[#29251f]"
          >
            <span>Read and reflect</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
