import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLang } from '@/lib/i18n'

const TICKER_ITEMS = [
  'Bitcoin', 'Lightning Network', 'El Salvador', 'CUBO+', 'Talento Digital',
  'Desarrollo Web', 'Diseño UX', 'Contenido', 'Innovación', 'Comunidad',
  'Bitcoin', 'Lightning Network', 'El Salvador', 'CUBO+', 'Talento Digital',
  'Desarrollo Web', 'Diseño UX', 'Contenido', 'Innovación', 'Comunidad',
]

const STATS_KEYS = ['hero.stats.cohort', 'hero.stats.country', 'hero.stats.focus', 'hero.stats.format'] as const
const STATS_VALUES = ['2026', 'El Salvador', 'Bitcoin + Producto', 'Editorial']

export function HeroSection() {
  const { t } = useLang()
  const scrollToCreators = () => {
    const section = document.getElementById('creators')
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="inicio" className="relative border-b border-[var(--color-border)] overflow-hidden -mt-24 pt-24">

      {/* SVG decorative background */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="var(--color-border)" fillOpacity="0.55" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Soft color blobs */}
      <div className="pointer-events-none absolute -left-32 -top-16 h-80 w-80  bg-[color:rgba(233,147,168,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72  bg-[color:rgba(159,168,255,0.16)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-56 w-96 -translate-x-1/2  bg-[color:rgba(141,200,198,0.14)] blur-3xl" />

      {/* Decorative SVG shapes */}
      <svg aria-hidden="true" className="pointer-events-none absolute right-8 top-10 opacity-[0.07]" width="220" height="220" viewBox="0 0 220 220" fill="none">
        <circle cx="110" cy="110" r="108" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="6 6"/>
        <circle cx="110" cy="110" r="72" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx="110" cy="110" r="36" stroke="var(--color-accent)" strokeWidth="1"/>
      </svg>
      <svg aria-hidden="true" className="pointer-events-none absolute left-4 bottom-12 opacity-[0.06]" width="140" height="140" viewBox="0 0 140 140" fill="none">
        <rect x="2" y="2" width="136" height="136" rx="24" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeDasharray="5 5"/>
        <rect x="22" y="22" width="96" height="96" rx="16" stroke="var(--color-accent-secondary)" strokeWidth="1"/>
      </svg>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-0">

        {/* Headline */}
        <h1
          className="mt-5 animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0"
          style={{
            animationDelay: '0.14s',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
          }}
        >
          {t('hero.headline')}
          <span className="block text-[var(--color-accent)]">{t('hero.headlineAccent')}</span>
        </h1>

        {/* Description */}
        <p
          className="mt-6 animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0"
          style={{
            animationDelay: '0.26s',
            fontSize: '1rem',
            lineHeight: 1.85,
            color: 'var(--color-foreground-muted)',
            maxWidth: '58ch',
          }}
        >
          {t('hero.description')}
        </p>

        {/* CTA */}
        <div
          className="mt-8 flex flex-wrap items-center gap-3 animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0"
          style={{ animationDelay: '0.34s' }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToCreators}
            className="group  gap-2 hover:-translate-y-0.5 hover:shadow-md"
            style={{ fontWeight: 600, fontSize: '0.84rem' }}
          >
            {t('hero.ctaDirectory')}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' })}
            className=" hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{ fontSize: '0.84rem', fontWeight: 500 }}
          >
            {t('hero.ctaProgram')}
          </Button>
        </div>

        {/* Stats Bento row */}
        <div
          className="mt-12 animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0"
          style={{ animationDelay: '0.44s' }}
          id="programa"
        >
          <Card
            variant="default"
            className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[var(--color-border)] overflow-hidden rounded-2xl"
          >
            {STATS_KEYS.map((key, i) => (
              <div key={key} className="px-5 py-4">
                <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)' }}>
                  {t(key)}
                </p>
                <p className="mt-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-foreground)' }}>
                  {STATS_VALUES[i]}
                </p>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mt-12 border-t border-[var(--color-border)] bg-[var(--color-background-overlay)] overflow-hidden py-2.5"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-4" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', whiteSpace: 'nowrap' }}>
              {item}
              <span style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
