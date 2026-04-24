'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/context/theme-provider'

type Props = {
  className?: string
}

export default function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={
        className ??
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm'
      }
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="text-base leading-none">{isDark ? '🌙' : '☀️'}</span>
    </button>
  )
}