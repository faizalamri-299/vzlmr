import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, wrap } from 'motion/react'

/**
 * Scroll Text Lines, after motion.dev's example: four lines of display type on
 * infinite tickers, each offset by the page's scroll position at its own speed
 * and direction, alternating solid and outlined copies of the word.
 *
 * The example uses motion-plus's `Ticker`, which is a Motion+ component, so the
 * looping is done here: one solid/outline pair is measured, enough pairs are
 * laid down to overflow the viewport, and the offset wraps by one pair's width —
 * the row is periodic at that interval, so the seam never shows.
 */

/** Speeds and directions from the reference, verbatim. */
const LINES = [
  { text: 'Landscape', speed: 0.5 },
  { text: 'Portrait', speed: -0.7 },
  { text: 'Street', speed: 0.6 },
  { text: 'Architecture', speed: -0.8 },
]

function TickerLine({ text, speed, index }) {
  const pairRef = useRef(null)
  const [pairWidth, setPairWidth] = useState(0)
  const [copies, setCopies] = useState(3)

  const { scrollY } = useScroll()
  const x = useTransform(scrollY, (y) =>
    pairWidth ? wrap(-pairWidth, 0, y * speed) : 0,
  )

  useEffect(() => {
    const pair = pairRef.current
    if (!pair) return

    const measure = () => {
      const width = pair.getBoundingClientRect().width
      if (!width) return
      setPairWidth(width)
      setCopies(Math.ceil(document.documentElement.clientWidth / width) + 2)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(pair)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div className={`ticker-line ticker-${index}`} style={{ x }} aria-hidden="true">
      {Array.from({ length: copies }, (_, i) => (
        <span className="ticker-pair" key={i} ref={i === 0 ? pairRef : undefined}>
          <span className="text-solid">{text}</span>
          <span className="text-outline">{text}</span>
        </span>
      ))}
    </motion.div>
  )
}

export default function TextLines() {
  return (
    <section className="text-section" aria-labelledby="lines-title">
      <h2 className="sr-only" id="lines-title">
        Landscape, portrait, street and architecture
      </h2>

      {LINES.map((line, i) => (
        <TickerLine key={line.text} text={line.text} speed={line.speed} index={i} />
      ))}
    </section>
  )
}
