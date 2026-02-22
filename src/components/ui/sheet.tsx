import { type ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  children: ReactNode
  className?: string
}

const sideClasses = {
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm data-[state=open]:slide-in-from-left',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm data-[state=open]:slide-in-from-right',
  top: 'inset-x-0 top-0 w-full h-auto max-h-[80vh] data-[state=open]:slide-in-from-top',
  bottom: 'inset-x-0 bottom-0 w-full h-auto max-h-[80vh] data-[state=open]:slide-in-from-bottom',
}

export function Sheet({ open, onOpenChange, side = 'right', children, className }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'fixed z-50 border border-[var(--color-border)] bg-[var(--color-background)] shadow-sm transition-transform',
          sideClasses[side],
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
