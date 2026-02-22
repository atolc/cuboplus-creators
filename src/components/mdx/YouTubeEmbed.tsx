import { cn } from '@/lib/utils'

export interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export function YouTubeEmbed({ videoId, title = 'YouTube video', className }: YouTubeEmbedProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[var(--radius-default)] border border-[var(--color-border)] bg-[var(--color-background-muted)]',
        'aspect-video',
        className
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
