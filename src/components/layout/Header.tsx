import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useLang } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { icons } from '@/components/ui/icon'

export function Header() {
  const [atTop, setAtTop] = useState(true)
  const { resolved, toggleDark } = useTheme()
  const { lang, toggleLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full transition-all duration-300',
        atTop
          ? 'bg-transparent border-b border-transparent'
          : 'border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]',
      ].join(' ')}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">

        {/* Branding */}
        <Link to="/" className="group inline-flex items-center gap-2.5">
          <div className="flex flex-col leading-none">
            <span
              className="text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.02em', fontSize: '0.88rem' }}
            >
              CUBO Creators
            </span>
            <span
              className="text-[var(--color-foreground-muted)]"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em' }}
            >
              soft notes / 2026
            </span>
          </div>
        </Link>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1">
          {/* Language toggle — auto-width to fit icon + label */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            title={lang === 'ES' ? 'Switch to English' : 'Cambiar a Inglés'}
            aria-label="Toggle language"
            className="gap-1.5 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] px-2.5"
          >
            <icons.globe size={15} strokeWidth={1.8} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.08em' }}>
              {lang}
            </span>
          </Button>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDark}
            title={resolved === 'dark' ? t('header.lightMode') : t('header.darkMode')}
            aria-label="Toggle dark mode"
            className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] px-2.5"
          >
            {resolved === 'dark'
              ? <icons.sun size={16} strokeWidth={1.8} />
              : <icons.moon size={16} strokeWidth={1.8} />
            }
          </Button>
        </div>
      </div>
    </header>
  )
}
