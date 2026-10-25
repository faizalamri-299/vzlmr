import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/** The reference's scramble alphabet, verbatim. */
const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡'

/** Frames each character holds before the next one settles. */
const HOLD = 3

const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)]

/**
 * Stands in for motion-plus's `ScrambleText`. Characters settle left to right
 * while the rest keep churning. Hand-rolled rather than GSAP's ScrambleText
 * plugin, which would add 4KB gzip for ten-character labels; it writes
 * `textContent` directly on GSAP's ticker so React never re-renders per frame.
 */
export default function ScrambleText({ text, active }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!active || !el) return

    let frame = 0
    const tick = () => {
      frame += 1
      const settled = Math.floor(frame / HOLD)
      el.textContent = text
        .split('')
        .map((char, i) => (i < settled || char === ' ' ? char : pick()))
        .join('')
      if (settled >= text.length) gsap.ticker.remove(tick)
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      el.textContent = text
    }
  }, [text, active])

  return <span ref={ref}>{text}</span>
}
