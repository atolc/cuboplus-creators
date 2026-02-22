import { Link } from 'react-router-dom'
import type { CreatorMeta } from '@/lib/creators'
import { useLang } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'

export interface CreatorCardProps {
  creator: CreatorMeta
  index?: number
  featured?: boolean
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export function CreatorCard({ creator, index = 0, featured = false }: CreatorCardProps) {
  const { lang } = useLang()
  const accentColor = creator.accentColor || creator.categoryColor || 'var(--color-accent)'

  const bio = lang === 'EN' && creator.bio_en ? creator.bio_en : creator.bio
  const occupation = lang === 'EN' && creator.occupation_en ? creator.occupation_en : creator.occupation
  const category = lang === 'EN' && creator.category_en ? creator.category_en : creator.category
  const skills = (lang === 'EN' && creator.softSkills_en ? creator.softSkills_en : creator.softSkills) ?? []

  return (
    <Link
      to={`/creator/${creator.slug}`}
      className="group block h-full animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
      style={{ animationDelay: `${0.06 + (index % 10) * 0.05}s` }}
    >
      <Card
        variant="default"
        className="flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-inner]"
      >
        {/* ── Bento header zone ── */}
        <div
          className="relative overflow-hidden flex flex-col justify-between p-4"
          style={{
            backgroundColor: `${accentColor}14`,
            minHeight: featured ? '120px' : '100px',
          }}
        >
          {/* Dot grid texture */}
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full">
            <defs>
              <pattern
                id={`bento-dots-${creator.slug}`}
                x="0" y="0" width="14" height="14"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="1" fill={accentColor} fillOpacity="0.22" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#bento-dots-${creator.slug})`} />
          </svg>

          {/* Top row: category badge + arrow indicator */}
          <div className="relative z-10 flex items-start justify-between">
            <Badge
              color={accentColor}
              className="text-[0.52rem] uppercase tracking-widest"
            >
              {category}
            </Badge>
            <Icon
              size={14}
              strokeWidth={1.8}
              className="text-[var(--color-border)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            >
              <path d="M5 19L19 5M19 5H7M19 5v12" stroke="currentColor" fill="none" />
            </Icon>
          </div>

          {/* Avatar — anchored to bottom of header */}
          <div className="relative z-10 mt-3">
            <Avatar
              src={creator.avatar}
              alt={creator.name}
              fallback={getInitials(creator.name)}
              size={featured ? 'lg' : 'md'}
              className="rounded-xl border-2 border-[var(--color-background)] shadow-sm"
              style={{ backgroundColor: accentColor, color: 'white' }}
            />
          </div>
        </div>

        {/* ── Card body ── */}
        <CardContent className={`flex flex-col flex-1 gap-3 ${featured ? 'p-5' : 'p-4'}`}>
          {/* Name + occupation */}
          <div>
            <h3
              className="leading-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: featured ? '1.15rem' : '1.05rem',
                letterSpacing: '-0.01em',
              }}
            >
              {creator.name}
            </h3>
            <p
              className="mt-0.5 text-[var(--color-foreground-muted)]"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {occupation || 'Creator'}
            </p>
          </div>

          {/* Bio */}
          <p
            className={`text-[var(--color-foreground-muted)] flex-1 ${featured ? '' : 'line-clamp-3'}`}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.75 }}
          >
            {bio}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, featured ? 5 : 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-[0.55rem] ">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

      </Card>
    </Link>
  )
}

