import { Link } from 'react-router-dom'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-overlay-subtle)]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 border-b border-[var(--color-border)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem' }}>
                CUBO Creators
              </span>
            </Link>

            <p className="mt-4 max-w-md" style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--color-foreground-muted)' }}>
              {t('footer.description')}
            </p>
          </div>

          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)' }}>
            &copy; {year} CUBO+ · El Salvador
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-[0.7rem]" style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[var(--color-border)]" aria-hidden="true">&middot;</span>
            <a
              href="https://www.cuboplus.academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              cuboplus.academy
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
