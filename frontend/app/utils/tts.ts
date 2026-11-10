let currentOnEndCallback: (() => void) | null = null

export const speak = (
  text: string,
  lang: string,
  onStart?: () => void,
  onEnd?: () => void,
  rate = 0.9,
  pitch = 1,
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return
  }

  stopSpeaking()

  const cleanText = text.replace(/।।.*।।/g, '').replace(/[|।]/g, '').trim()
  const speech = new SpeechSynthesisUtterance(cleanText || text)

  speech.lang = lang
  speech.rate = rate
  speech.pitch = pitch

  const voices = window.speechSynthesis.getVoices()
  const lowerLang = lang.toLowerCase()
  const langPrefix = lowerLang.split('-')[0]

  let matchedVoice = voices.find((v) => v.lang.toLowerCase() === lowerLang)
  if (!matchedVoice) {
    matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix))
  }
  if (!matchedVoice && (langPrefix === 'sa' || lowerLang.includes('sa'))) {
    matchedVoice = voices.find((v) => v.lang.toLowerCase().includes('hi'))
  }

  if (matchedVoice) {
    speech.voice = matchedVoice
  }

  speech.onstart = () => {
    if (onStart) onStart()
  }

  const handleEnd = () => {
    currentOnEndCallback = null
    if (onEnd) onEnd()
  }

  speech.onend = handleEnd
  speech.onerror = handleEnd

  currentOnEndCallback = onEnd ?? null
  window.speechSynthesis.speak(speech)
}

export const stopSpeaking = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return
  }
  window.speechSynthesis.cancel()
  if (currentOnEndCallback) {
    currentOnEndCallback()
    currentOnEndCallback = null
  }
}
