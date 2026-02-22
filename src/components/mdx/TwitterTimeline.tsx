import { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export interface TwitterTimelineProps {
  username: string
  height?: number
  className?: string
}

const TWITTER_SCRIPT_URL = 'https://platform.twitter.com/widgets.js'

function loadTwitterScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    const existing = document.querySelector(`script[src="${TWITTER_SCRIPT_URL}"]`)
    if (existing) {
      if ('twttr' in window && (window as unknown as { twttr: { widgets: { load: () => void } } }).twttr?.widgets) {
        resolve()
      } else {
        const check = setInterval(() => {
          if ('twttr' in window) {
            clearInterval(check)
            resolve()
          }
        }, 50)
        setTimeout(() => {
          clearInterval(check)
          resolve()
        }, 5000)
      }
      return
    }
    const script = document.createElement('script')
    script.src = TWITTER_SCRIPT_URL
    script.async = true
    script.charset = 'utf-8'
    script.onload = () => resolve()
    script.onerror = () => resolve()
    document.body.appendChild(script)
  })
}

export function TwitterTimeline({ username, height = 500, className }: TwitterTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolved } = useTheme()
  const theme = resolved === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    if (!username || !containerRef.current) return

    const mount = async () => {
      await loadTwitterScript()
      const twttr = (window as unknown as { twttr?: { widgets: { load: (el?: HTMLElement) => void } } }).twttr
      if (twttr?.widgets?.load) {
        twttr.widgets.load(containerRef.current ?? undefined)
      }
    }

    mount()
  }, [username, theme])

  const cleanUsername = username.replace('@', '')

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      <a
        key={theme}
        className="twitter-timeline"
        href={`https://twitter.com/${cleanUsername}`}
        data-theme={theme}
        data-height={height}
        data-chrome="nofooter"
      >
        Tweets by @{cleanUsername}
      </a>
    </div>
  )
}
