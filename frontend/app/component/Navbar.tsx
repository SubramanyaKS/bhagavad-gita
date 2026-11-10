'use client'

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  ScriptKey,
  setSavedScript,
  SUPPORTED_SCRIPTS,
  useScriptPreference,
} from '@/app/utils/scripts'

const subscribeToTheme = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  window.addEventListener('gita_theme_changed', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('gita_theme_changed', callback)
  }
}

const getThemeSnapshot = (): boolean => {
  if (typeof window === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function Navbar() {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const activeScript = useScriptPreference()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.contains('dark')
    if (isDarkNow) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('gita_theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('gita_theme', 'dark')
    }
    window.dispatchEvent(new Event('gita_theme_changed'))
  }

  const handleSelectScript = (key: ScriptKey) => {
    setSavedScript(key)
    setIsLangMenuOpen(false)
  }

  const currentScriptOption =
    SUPPORTED_SCRIPTS.find((s) => s.key === activeScript) ?? SUPPORTED_SCRIPTS[0]

  return (
    <nav className="sticky top-0 z-100 flex h-18 items-center justify-between border-b border-[#ded8cc] bg-[rgba(247,244,237,0.96)] px-[6%] backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center text-[22px] font-bold text-[#29251f] no-underline">
        <span className="mr-2 text-[26px]">ॐ</span>
        <span>Gita</span>
      </Link>

      {/* Nav Links */}
      <div className="flex gap-8.5 font-sans text-sm">
        <Link href="/explore" className="text-[#625b51] no-underline hover:text-[#29251f] transition">
          Read
        </Link>
        <Link href="/learn" className="text-[#625b51] no-underline hover:text-[#29251f] transition">
          Learn
        </Link>
        <Link href="/ask" className="text-[#625b51] no-underline hover:text-[#29251f] transition">
          Ask
        </Link>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-2.5">
        {/* Global Script Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            title={`Active script: ${currentScriptOption.label}`}
            aria-label="Select script language"
            className="flex h-9.5 items-center gap-1.5 rounded-full border border-[#d8d1c5] bg-[#fffdf8] px-3 font-sans text-[12px] text-[#625b51] cursor-pointer transition hover:border-[#bfb3a0] hover:text-[#29251f]"
          >
            <span>🌐</span>
            <span className="font-medium uppercase">{currentScriptOption.nativeName}</span>
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[#ded6c9] bg-[#fffdf8] p-2 shadow-[0_12px_36px_rgba(40,32,20,0.12)]">
              <div className="px-3 py-1.5 font-sans text-[10px] uppercase tracking-[1.5px] text-[#9b8d7c]">
                Choose Script / लिपि
              </div>
              <div className="space-y-0.5">
                {SUPPORTED_SCRIPTS.map((script) => (
                  <button
                    key={script.key}
                    type="button"
                    onClick={() => handleSelectScript(script.key)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-sans text-[13px] transition cursor-pointer ${
                      activeScript === script.key
                        ? 'bg-[#f4efe8] font-semibold text-[#29251f]'
                        : 'text-[#625b51] hover:bg-[#faf7f2] hover:text-[#29251f]'
                    }`}
                  >
                    <span>{script.nativeName}</span>
                    <span className="text-[11px] text-[#9b8d7c]">{script.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#d8d1c5] bg-[#fffdf8] cursor-pointer transition hover:border-[#bfb3a0]"
        >
          <span className="text-[15px]">{isDark ? '☼' : '☽'}</span>
        </button>
      </div>
    </nav>
  )
}
