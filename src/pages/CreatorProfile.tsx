import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { YouTubeEmbed, TweetEmbed, Callout } from '@/components/mdx'
import { TwitterTimeline } from '@/components/mdx'
import { YouTubeVideoList } from '@/components/YouTubeVideoList'
import { SimilarCreators } from '@/components/SimilarCreators'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getCreatorBySlug } from '@/lib/creators'
import { useLang } from '@/lib/i18n'
import { useConfetti } from '@/components/ui/confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { icons } from '@/components/ui/icon'

const mdxComponents = {
  YouTubeEmbed,
  TweetEmbed,
  Callout,
}

function getInitials(name: string) {
  return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function CreatorProfile() {
  const { slug } = useParams<{ slug: string }>()
  const [creator, setCreator] = useState<Awaited<ReturnType<typeof getCreatorBySlug>>>(null)
  const { fire: fireConfetti } = useConfetti()
  const { lang, t } = useLang()

  useEffect(() => {
    if (slug) {
      getCreatorBySlug(slug, lang).then(setCreator)
    }
  }, [slug, lang])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      fireConfetti()
    } catch {
      // fallback
    }
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
              <Skeleton variant="circle" className="h-20 w-20" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="h-8 w-48" />
                <Skeleton variant="text" className="h-4 w-32" />
              </div>
            </div>
            <Skeleton variant="rect" className="h-96" />
          </div>
        </main>
      </div>
    )
  }

  const { meta, Component } = creator
  const accentColor = meta.accentColor || meta.categoryColor || 'var(--color-accent)'
  const localBio = lang === 'EN' && meta.bio_en ? meta.bio_en : meta.bio
  const localOccupation = lang === 'EN' && meta.occupation_en ? meta.occupation_en : meta.occupation
  const localCategory = lang === 'EN' && meta.category_en ? meta.category_en : meta.category
  const localSkills = (lang === 'EN' && meta.softSkills_en ? meta.softSkills_en : meta.softSkills) ?? []

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Header />
      <main className="flex-1">
        {/* Profile masthead */}
        <div className="border-b border-[var(--color-border)]" style={{ borderTop: `3px solid ${accentColor}` }}>
          <div className="mx-auto max-w-4xl px-6 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              <Link to="/" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5">
                <icons.arrowLeft size={12} strokeWidth={1.5} />
                {t('profile.directory')}
              </Link>
              <span className="text-[var(--color-border)]">/</span>
              <span className="text-[var(--color-foreground-muted)]">{meta.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
              {/* Avatar */}
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] opacity-0 shrink-0" style={{ animationDelay: '0.05s' }}>
                <Avatar
                  src={meta.avatar}
                  alt={meta.name}
                  fallback={getInitials(meta.name)}
                  size="xl"
                  className="rounded-xl border-0 md:h-24 md:w-24"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                />
              </div>

              {/* Name + meta */}
              <div className="flex-1 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.1s' }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-foreground)',
                    margin: 0,
                  }}
                >
                  {meta.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge color={accentColor} className="text-white uppercase tracking-wider text-[0.6rem]" style={{ color: 'white' }}>
                    {localCategory}
                  </Badge>
                  <Badge variant="secondary" className="uppercase tracking-wider text-[0.6rem]">
                    {localOccupation}
                  </Badge>
                </div>
              </div>

              {/* Share button */}
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem' }}
                >
                  <icons.share size={13} strokeWidth={1.5} />
                  {t('profile.share')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0 lg:sticky lg:top-20 lg:self-start animate-[fadeInLeft_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.15s' }}>
              {/* Bio */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--color-foreground-muted)' }}>
                {localBio}
              </p>

              {/* Skills */}
              {localSkills.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)', marginBottom: '10px' }}>
                    {t('profile.skills')}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {localSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-[0.58rem] rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col gap-2">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)', marginBottom: '6px' }}>
                  {t('profile.contact')}
                </p>
                {meta.github && (
                  <a
                    href={meta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 py-2 border-b border-[var(--color-border-muted)] text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors group"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
                  >
                    <icons.github size={14} strokeWidth={1.6} />
                    GitHub
                    <icons.arrowUpRight size={10} strokeWidth={1.5} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {meta.linkedin && (
                  <a
                    href={meta.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 py-2 border-b border-[var(--color-border-muted)] text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors group"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
                  >
                    <icons.linkedin size={14} strokeWidth={1.6} />
                    LinkedIn
                    <icons.arrowUpRight size={10} strokeWidth={1.5} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {meta.twitter && (
                  <a
                    href={`https://x.com/${meta.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 py-2 border-b border-[var(--color-border-muted)] text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors group"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
                  >
                    <icons.twitter size={14} strokeWidth={1.6} />
                    X / Twitter
                    <icons.arrowUpRight size={10} strokeWidth={1.5} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </aside>

            {/* Main content with tabs */}
            <div className="flex-1 min-w-0 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
              {meta.twitter || (meta.youtubeVideos && meta.youtubeVideos.length > 0) ? (
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="about">{t('tabs.about')}</TabsTrigger>
                    {meta.twitter && <TabsTrigger value="twitter">{t('tabs.twitter')}</TabsTrigger>}
                    {meta.youtubeVideos && meta.youtubeVideos.length > 0 && (
                      <TabsTrigger value="youtube">{t('tabs.youtube')}</TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value="about">
                    <div className="prose max-w-none">
                      <MDXProvider components={mdxComponents}>
                        <Component />
                      </MDXProvider>
                    </div>
                  </TabsContent>
                  {meta.twitter && (
                    <TabsContent value="twitter">
                      <TwitterTimeline username={meta.twitter} height={500} />
                    </TabsContent>
                  )}
                  {meta.youtubeVideos && meta.youtubeVideos.length > 0 && (
                    <TabsContent value="youtube">
                      <YouTubeVideoList videos={meta.youtubeVideos} />
                    </TabsContent>
                  )}
                </Tabs>
              ) : (
                <div className="prose max-w-none">
                  <MDXProvider components={mdxComponents}>
                    <Component />
                  </MDXProvider>
                </div>
              )}

              <SimilarCreators
                currentSlug={meta.slug}
                category={meta.category}
                className="mt-16"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
