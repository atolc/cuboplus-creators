import { Link } from 'react-router-dom'
import { getAllCreators } from '@/lib/creators'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { icons } from '@/components/ui/icon'

export interface SimilarCreatorsProps {
  currentSlug: string
  category: string
  className?: string
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export function SimilarCreators({ currentSlug, category, className }: SimilarCreatorsProps) {
  const { lang, t } = useLang()
  const similar = getAllCreators()
    .filter((c) => c.slug !== currentSlug && c.category === category)
    .slice(0, 3)

  if (similar.length === 0) return null

  return (
    <section className={cn('pt-10 border-t border-[var(--color-border)]', className)}>
      <p
        className="mb-6"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)' }}
      >
        {t('similar.title')}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {similar.map((creator) => {
          const accent = creator.accentColor || creator.categoryColor || 'var(--color-accent)'
          return (
            <Link
              key={creator.slug}
              to={`/creator/${creator.slug}`}
              className="group block"
            >
              <Card
                variant="outline"
                className="flex items-center gap-3 p-3 hover:border-[var(--color-foreground)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Avatar
                  src={creator.avatar}
                  alt={creator.name}
                  fallback={getInitials(creator.name)}
                  size="sm"
                  className="rounded-lg border-0 shrink-0"
                  style={{ backgroundColor: accent, color: 'white' }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem' }}
                  >
                    {creator.name}
                  </p>
                  <Badge variant="secondary" className="mt-0.5 text-[0.55rem] uppercase tracking-wider rounded-full">
                    {lang === 'EN' && creator.occupation_en ? creator.occupation_en : creator.occupation}
                  </Badge>
                </div>
                <icons.arrowUpRight size={12} strokeWidth={1.5} className="shrink-0 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors" />
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
