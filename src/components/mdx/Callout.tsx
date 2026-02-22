import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'success' | 'default'
  title?: string
  className?: string
}

export function Callout({ children, type = 'default', title, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'my-4 rounded-[var(--radius-default)] border p-4',
        {
          'border-[var(--color-accent-secondary)]/50 bg-[var(--color-accent-secondary)]/5': type === 'info',
          'border-amber-500/50 bg-amber-500/5': type === 'warning',
          'border-green-500/50 bg-green-500/5': type === 'success',
          'border-[var(--color-border)] bg-[var(--color-background-muted)]': type === 'default',
        },
        className
      )}
    >
      {title && (
        <p className="mb-2 font-semibold text-[var(--color-foreground)]">{title}</p>
      )}
      <div className="text-sm text-[var(--color-foreground-muted)] [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
