import { useState, useEffect } from 'react'
import {
  getStoredTheme,
  setStoredTheme,
  getEffectiveTheme,
  applyTheme,
  type Theme,
} from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => getEffectiveTheme())

  useEffect(() => {
    const effective = getEffectiveTheme()
    applyTheme(effective)
    setResolved(effective)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        const effective = getEffectiveTheme()
        applyTheme(effective)
        setResolved(effective)
      }
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setStoredTheme(newTheme)
    setThemeState(newTheme)
  }

  const toggleDark = () => {
    const next = resolved === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { theme, setTheme, resolved, toggleDark }
}
