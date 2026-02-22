import { cn } from '@/lib/utils'

export interface Step {
  id: string
  label: string
  description?: string
}

export interface StepperProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Stepper({ steps, currentStep, orientation = 'horizontal', className }: StepperProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        orientation === 'vertical' && 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center gap-2',
              orientation === 'vertical' && 'flex-col items-start'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                isCompleted && 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white',
                isCurrent && 'border-[var(--color-accent)] bg-transparent text-[var(--color-accent)]',
                !isCompleted && !isCurrent && 'border-[var(--color-border)] text-[var(--color-foreground-muted)]'
              )}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className={orientation === 'vertical' ? 'flex flex-col' : ''}>
              <span
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-[var(--color-foreground)]' : 'text-[var(--color-foreground-muted)]'
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <p className="text-xs text-[var(--color-foreground-muted)]">{step.description}</p>
              )}
            </div>
            {orientation === 'horizontal' && index < steps.length - 1 && (
              <div
                className={cn(
                  'h-px flex-1 min-w-[24px]',
                  isCompleted ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
