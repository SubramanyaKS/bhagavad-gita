'use client'

import React from 'react'
import {
  ScriptKey,
  SUPPORTED_SCRIPTS,
  setSavedScript,
} from '@/app/utils/scripts'

type ScriptSelectorProps = {
  activeScript: ScriptKey
  onChange?: (script: ScriptKey) => void
  size?: 'sm' | 'md'
}

export default function ScriptSelector({
  activeScript,
  onChange,
  size = 'md',
}: ScriptSelectorProps) {
  const handleSelect = (key: ScriptKey) => {
    setSavedScript(key)
    if (onChange) {
      onChange(key)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Select script">
      {SUPPORTED_SCRIPTS.map((script) => {
        const isSelected = activeScript === script.key
        return (
          <button
            key={script.key}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleSelect(script.key)}
            className={`rounded-full transition cursor-pointer font-sans ${
              size === 'sm'
                ? 'px-2.5 py-1 text-[11px]'
                : 'px-3 py-1.5 text-[12px]'
            } ${
              isSelected
                ? 'bg-[#302b24] text-[#fffdf8] shadow-[0_2px_8px_rgba(48,43,36,0.2)]'
                : 'border border-[#ded6c9] bg-[#fffdf8] text-[#6d6356] hover:border-[#b8aa96] hover:bg-[#f6f2ea]'
            }`}
          >
            <span>{script.nativeName}</span>
          </button>
        )
      })}
    </div>
  )
}
