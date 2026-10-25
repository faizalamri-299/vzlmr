import { useRef } from 'react'
import { categories, photos } from '../data/photos'
import { gsap, useGSAP } from '../lib/gsap'

/**
 * The category index: one full-width row per category, its cover photograph
 * behind the word, on the hero's hairline gutters. Each row is scrubbed in as
 * it rises up the screen: the photo wipes open from the middle outward and the
 * word slides in from alternate sides. Picking a row filters the archive above
 * and glides back up to it.
 *
 * Replaced, in turn, the four-line ticker band and then a plain stack of four
 * words; the user found both too quiet next to the new hero.
 */
const ROWS = categories
  .filter((c) => c.id !== 'all')
  .map((c) => {
    const own = photos.filter((p) => p.category === c.id)
    // Rows are wide and short, so a landscape-orientation cover crops least.
    const cover = own.find((p) => p.width > p.height) ?? own[0]
    return { ...c, count: own.length, cover }
  })
  .filter((row) => row.cover)

export default function TextLines({ onPick }) {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.cat-row', sectionRef.current).forEach((row, i) => {
          const from = i % 2 ? 1 : -1
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: row, start: 'top bottom', end: 'center 55%', scrub: 0.5 },
            })
            .fromTo(
              row.querySelector('.cat-media'),
              { clipPath: 'inset(0% 50% 0% 50%)' },
              { clipPath: 'inset(0% 0% 0% 0%)' },
              0,
            )
            .fromTo(row.querySelector('.cat-media img'), { scale: 1.35 }, { scale: 1 }, 0)
            .fromTo(row.querySelector('.cat-word'), { xPercent: from * 60 }, { xPercent: 0 }, 0)
            .fromTo(row.querySelector('.cat-count'), { opacity: 0 }, { opacity: 1 }, 0.6)
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section className="cats" ref={sectionRef} aria-labelledby="cats-title">
      <h2 className="sr-only" id="cats-title">
        Browse by category
      </h2>

      {ROWS.map((row) => (
        <button
          key={row.id}
          type="button"
          className="cat-row"
          onClick={() => onPick(row.id)}
          aria-label={`Show ${row.count} ${row.label.toLowerCase()} photographs in the archive`}
        >
          <span className="cat-media" aria-hidden="true">
            <img src={row.cover.src} alt="" loading="lazy" decoding="async" />
          </span>
          <span className="cat-word">{row.label}</span>
          <span className="cat-count">
            {String(row.count).padStart(2, '0')} frames
          </span>
        </button>
      ))}
    </section>
  )
}
