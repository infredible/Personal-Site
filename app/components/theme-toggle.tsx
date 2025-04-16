'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set initial theme based on system preferences
  useEffect(() => {
    if (!mounted) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(systemPrefersDark ? 'dark' : 'light')
      setMounted(true)
    }
  }, [mounted, setTheme])

  if (!mounted) return null

  return (
    <div className="theme-toggle theme-position fixed bottom-6 left-6 z-40 w-auto">
      <div className="segmented-control inline-flex" role="radiogroup" aria-label="Theme preference">
        <button
          onClick={() => setTheme('light')}
          className={`segment ${theme === 'light' ? 'active' : ''}`}
          aria-label="Light mode"
          role="radio"
          aria-checked={theme === 'light'}
        >
          <Sun size={14} strokeWidth={2} />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`segment ${theme === 'dark' ? 'active' : ''}`}
          aria-label="Dark mode"
          role="radio"
          aria-checked={theme === 'dark'}
        >
          <Moon size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
} 