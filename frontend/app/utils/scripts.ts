import { useSyncExternalStore } from 'react'

export type ScriptKey = 'sa' | 'iast' | 'kn' | 'te' | 'ta' | 'ml'

export interface ScriptOption {
  key: ScriptKey
  label: string
  nativeName: string
  ttsLang: string
}

export const SUPPORTED_SCRIPTS: ScriptOption[] = [
  { key: 'sa', label: 'Devanagari', nativeName: 'संस्कृतम्', ttsLang: 'sa-IN' },
  { key: 'iast', label: 'IAST', nativeName: 'IAST (Roman)', ttsLang: 'sa-IN' },
  { key: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', ttsLang: 'kn-IN' },
  { key: 'te', label: 'Telugu', nativeName: 'తెలుగు', ttsLang: 'te-IN' },
  { key: 'ta', label: 'Tamil', nativeName: 'தமிழ்', ttsLang: 'ta-IN' },
  { key: 'ml', label: 'Malayalam', nativeName: 'മലയാളം', ttsLang: 'ml-IN' },
]

export const DEFAULT_SCRIPT: ScriptKey = 'sa'

export const getSavedScript = (): ScriptKey => {
  if (typeof window === 'undefined') return DEFAULT_SCRIPT
  const saved = localStorage.getItem('gita_script') as ScriptKey | null
  if (saved && SUPPORTED_SCRIPTS.some((s) => s.key === saved)) {
    return saved
  }
  return DEFAULT_SCRIPT
}

export const setSavedScript = (script: ScriptKey) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('gita_script', script)
  window.dispatchEvent(
    new CustomEvent('gita_script_changed', { detail: { script } }),
  )
}

const subscribeToScript = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('gita_script_changed', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('gita_script_changed', callback)
    window.removeEventListener('storage', callback)
  }
}

export const useScriptPreference = (): ScriptKey => {
  return useSyncExternalStore(
    subscribeToScript,
    getSavedScript,
    () => DEFAULT_SCRIPT,
  )
}
