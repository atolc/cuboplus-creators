declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number
    spread?: number
    origin?: { x?: number; y?: number }
    startVelocity?: number
    decay?: number
    scalar?: number
  }

  function confetti(options?: Options): Promise<null>
  export default confetti
}
