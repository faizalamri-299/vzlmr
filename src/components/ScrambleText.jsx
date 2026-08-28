import { useEffect, useState } from 'react'

/** The reference's scramble alphabet, verbatim. */
const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡'

/** Frames each character holds before the next one settles. */
const HOLD = 3

const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)]

/**
 * Stands in for motion-plus's `ScrambleText`, which is a Motion+ component.
 * Characters settle left to right while the rest keep churning.
 */
export default function ScrambleText({ text, active }) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (!active) return

    let frame = 0
    let raf = requestAnimationFrame(function tick() {
      frame += 1
      const settled = Math.floor(frame / HOLD)

      setOutput(
        text
          .split('')
          .map((char, i) => (i < settled || char === ' ' ? char : pick()))
          .join(''),
      )

      if (settled < text.length) raf = requestAnimationFrame(tick)
    })

    return () => cancelAnimationFrame(raf)
  }, [text, active])

  // Falls back to the real text until the first scrambled frame lands, so the
  // label is never briefly empty.
  return <span>{active && output ? output : text}</span>
}
