import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export interface ConfettiOptions {
  particleCount?: number
  spread?: number
  origin?: { x: number; y: number }
}

export function useConfetti() {
  const fire = useCallback((options?: ConfettiOptions) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      ...options,
    })
  }, [])

  return { fire }
}

export function ConfettiButton({
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { fire } = useConfetti()

  return (
    <button
      onClick={(e) => {
        fire()
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
