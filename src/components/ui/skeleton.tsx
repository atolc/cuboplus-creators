import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
}

export function Skeleton({ className, variant = 'rect', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[var(--color-background-muted)] rounded-[var(--radius-default)]',
        {
          'h-4 w-full': variant === 'text',
          'rounded-full aspect-square': variant === 'circle',
          'h-24 w-full': variant === 'rect',
        },
        className
      )}
      {...props}
    />
  )
}
