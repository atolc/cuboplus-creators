import { cn } from '@/lib/utils'
import type { YouTubeVideo } from '@/lib/creators'

export interface YouTubeVideoListProps {
  videos: YouTubeVideo[]
  className?: string
}

export function YouTubeVideoList({ videos, className }: YouTubeVideoListProps) {
  if (!videos || videos.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {videos.map((video) => (
        <div
          key={video.videoId}
          className="rounded-[var(--radius-default)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-background-muted)]"
        >
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-4">
            <h3
              className="font-semibold text-[var(--color-foreground)]"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}
            >
              {video.title}
            </h3>
            {video.description && (
              <p
                className="mt-2 text-[var(--color-foreground-muted)]"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.6 }}
              >
                {video.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
