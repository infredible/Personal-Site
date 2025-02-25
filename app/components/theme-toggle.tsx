'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="theme-toggle theme-position fixed bottom-6 left-6 z-40 w-auto">
      <div className="segmented-control inline-flex" role="radiogroup" aria-label="Theme preference">
        <button
          onClick={() => setTheme('system')}
          className={`segment ${theme === 'system' ? 'active' : ''}`}
          aria-label="System mode"
          role="radio"
          aria-checked={theme === 'system'}
        >
          <Laptop size={14} strokeWidth={2} />
          <span>Auto</span>
        </button>
        <button
          onClick={() => setTheme('light')}
          className={`segment ${theme === 'light' ? 'active' : ''}`}
          aria-label="Light mode"
          role="radio"
          aria-checked={theme === 'light'}
        >
          <Sun size={14} strokeWidth={2} />
          <span>Light</span>
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`segment ${theme === 'dark' ? 'active' : ''}`}
          aria-label="Dark mode"
          role="radio"
          aria-checked={theme === 'dark'}
        >
          <Moon size={14} strokeWidth={2} />
          <span>Dark</span>
        </button>
      </div>
    </div>
  )
} 