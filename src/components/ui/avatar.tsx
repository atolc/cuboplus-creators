import { type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-lg',
}

export function Avatar({ className, size = 'md', fallback, src, alt = '', ...props }: AvatarProps) {
  const initials = fallback ?? (alt ? alt.slice(0, 2).toUpperCase() : '?')

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover border border-[var(--color-border)]',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[var(--color-background-muted)] text-[var(--color-foreground-muted)] font-medium border border-[var(--color-border)]',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </span>
  )
}
