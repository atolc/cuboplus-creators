const STORAGE_KEY = 'landing-creators-theme'

export type Theme = 'light' | 'dark' | 'system'

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  return stored ?? 'system'
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function getEffectiveTheme(): 'light' | 'dark' {
  const stored = getStoredTheme()
  if (stored === 'light') return 'light'
  if (stored === 'dark') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function initTheme() {
  const effective = getEffectiveTheme()
  applyTheme(effective)
}
