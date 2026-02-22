import { useMemo } from 'react'
import { CreatorCard } from './CreatorCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getAllCreators } from '@/lib/creators'
import { shuffle } from '@/lib/utils'
import { useLang } from '@/lib/i18n'

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="sm:col-span-2 lg:col-span-2">
        <Skeleton variant="rect" className="h-64" />
      </div>
      <Skeleton variant="rect" className="h-64" />
      <Skeleton variant="rect" className="h-64" />
      <Skeleton variant="rect" className="h-64" />
      <Skeleton variant="rect" className="h-64" />
    </div>
  )
}

export function CreatorGrid() {
  console.log(getAllCreators())
  const creators = useMemo(() => shuffle(getAllCreators()), [])
  const { t } = useLang()

  return (
    <section id="creators" className="relative overflow-hidden">

      {/* SVG cross/plus pattern background */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.35]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-plus" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M16 8v16M8 16h16" stroke="var(--color-border)" strokeWidth="1" strokeLinecap="round"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-plus)" />
      </svg>

      {/* Accent blobs */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64  bg-[color:rgba(233,147,168,0.1)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-0 h-72 w-72  bg-[color:rgba(141,200,198,0.1)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-24">

        {/* Section header */}
        <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.63rem',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
            }}
          >
            {t('grid.subtitle')}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {t('grid.title')}
              <span className="block text-[var(--color-accent)]">{t('grid.titleAccent')}</span>
            </h2>
            <span
              className="shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-background-muted)] px-3 py-1"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-foreground-muted)',
              }}
            >
              {creators.length} {t('grid.profiles')}
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        {creators.length === 0 ? (
          <GridSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
            {creators.map((creator, index) => {
              const isFeatured = index === 0
              return (
                <div
                  key={creator.slug}
                  className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
                >
                  <CreatorCard creator={creator} index={index} featured={isFeatured} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
