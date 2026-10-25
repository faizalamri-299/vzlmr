import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

/**
 * The four categories, stacked and centred. Each word sits dim and brightens to
 * full as it scrolls up into the middle of the screen, scrubbed to the scroll so
 * it never plays on its own. Replaced the earlier four-line ticker band, which
 * read as busy next to the photographs.
 *
 * Only opacity and a short rise are animated, both compositor-only.
 */
const LINES = ['Landscape', 'Portrait', 'Street', 'Architecture']

export default function TextLines() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.line').forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: 0.12, yPercent: 18 },
            {
              opacity: 1,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                end: 'center 55%',
                scrub: true,
              },
            },
          )
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section className="text-section" ref={sectionRef} aria-labelledby="lines-title">
      <h2 className="sr-only" id="lines-title">
        Categories
      </h2>

      <ul className="lines">
        {LINES.map((text) => (
          <li className="line" key={text}>
            {text}
          </li>
        ))}
      </ul>
    </section>
  )
}
