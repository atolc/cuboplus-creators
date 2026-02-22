import { type LabelHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-[var(--color-foreground)] leading-none peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)

Label.displayName = 'Label'

export { Label }
