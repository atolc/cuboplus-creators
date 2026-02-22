import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
  color?: string
}

export function Badge({ className, variant = 'default', color, style, ...props }: BadgeProps) {
  const hasCustomColor = Boolean(color)

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-default)] px-2.5 py-0.5 text-xs font-medium transition-colors border',
        !hasCustomColor && {
          'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-[var(--color-accent)]/30':
            variant === 'default',
          'bg-[var(--color-background-muted)] text-[var(--color-foreground-muted)] border-[var(--color-border)]':
            variant === 'secondary',
          'border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]':
            variant === 'outline',
        },
        className
      )}
      style={{ ...(hasCustomColor ? { backgroundColor: `${color}20`, color, borderColor: `${color}40` } : {}), ...style }}
      {...props}
    />
  )
}
