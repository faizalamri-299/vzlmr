import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * A scale down the right edge, after the reference's latitude rail: each tick
 * is a section placed at its true position on the page, an amber notch rides the
 * scroll, and the section under it lights up. The ticks are links, so it
 * doubles as navigation.
 */
const STOPS = [
  { id: 'top', label: 'index' },
  { id: 'reel', label: 'surf' },
  { id: 'work', label: 'archive' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
]

export default function Rail() {
  const railRef = useRef(null)
  const [current, setCurrent] = useState(STOPS[0].label)

  useGSAP(
    () => {
      const rail = railRef.current
      const scale = rail.querySelector('.rail-scale')
      const ticks = gsap.utils.toArray('.rail-tick', rail)
      const marker = rail.querySelector('.rail-marker')
      const setY = gsap.quickSetter(marker, 'y', 'px')

      // Ticks sit where their sections sit, as a share of the scrollable page.
      // Re-run on every refresh, since images and fonts move the sections.
      const layout = () => {
        const max = ScrollTrigger.maxScroll(window) || 1
        const h = scale.offsetHeight
        STOPS.forEach((stop, i) => {
          const el = document.getElementById(stop.id)
          if (!el || !ticks[i]) return
          const at = Math.min(1, (el.getBoundingClientRect().top + window.scrollY) / max)
          gsap.set(ticks[i], { y: at * h })
        })
      }

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        // After the hero's pin has added its scroll length, or every tick
        // below it is measured short.
        refreshPriority: -1,
        onRefresh: layout,
        onUpdate: (self) => setY(self.progress * scale.offsetHeight),
      })

      STOPS.forEach((stop) => {
        const el = document.getElementById(stop.id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setCurrent(stop.label),
        })
      })

      layout()
    },
    { scope: railRef },
  )

  return (
    <nav className="rail" ref={railRef} aria-label="Sections">
      <div className="rail-scale">
        {STOPS.map((stop) => (
          <a
            key={stop.id}
            className={`rail-tick${current === stop.label ? ' is-current' : ''}`}
            href={`#${stop.id}`}
          >
            {stop.label}
          </a>
        ))}
        <span className="rail-marker" aria-hidden="true" />
      </div>
    </nav>
  )
}
