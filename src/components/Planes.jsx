import { useRef, useState } from 'react'
import { photos } from '../data/photos'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import ScrambleText from './ScrambleText'

/**
 * Scroll velocity: 3D planes, after motion.dev's example. Photographs recede on
 * a 3D diagonal; scrolling drives them past, and the *velocity* of that scroll
 * pushes a sine wave through the row, so the line ripples when you scroll hard
 * and settles when you stop.
 *
 * The reference is a standalone page that hijacks the wheel. Here the offset
 * comes from the page's own scroll through a pinned section instead — same
 * geometry and the same velocity-linked wave, without taking the scroll away.
 */

/**
 * Geometry. Plane size and the row's maths are the reference's; the count and
 * gap are ours.
 *
 * The row wraps at ±SPAN/2, and that jump is only invisible while the plane is
 * already past the camera (|z| > perspective, where z = centered × -1.2 and
 * perspective is 2000px). SPAN = (PLANE_WIDTH + PLANE_GAP) × TOTAL_PLANES, so
 * cutting the count from the reference's 26 to 10 has to buy the span back
 * through the gap: the reference's -80 overlap would put the wrap at z = 1440,
 * in full view. At +100 the wrap happens 433px past the camera, and about eight
 * planes hold the diagonal at any moment.
 */
const PLANE_WIDTH = 320
const PLANE_GAP = 100
const TOTAL_PLANES = 10

const STEP = PLANE_WIDTH + PLANE_GAP
const SPAN = STEP * TOTAL_PLANES

const wrapRow = gsap.utils.wrap(-SPAN / 2, SPAN / 2)

/**
 * The reference chases the wave with a stiff, near-critically-damped spring
 * (stiffness 300, damping 20, mass 0.3) that lands in about 50ms. An
 * exponential chase with that time constant reads the same and costs one
 * multiply per plane.
 */
const WAVE_LAG = 0.05

/** Seconds the row takes to catch up with the scroll; stands in for the reference's spring. */
const SCROLL_LAG = 0.5

function Plane({ index, photo, isHovered, planeRef, onHover, onOpen }) {
  return (
    <div
      className={`plane${isHovered ? ' is-hovered' : ''}`}
      ref={planeRef}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={onOpen}
    >
      <div className="plane-image-container">
        <img
          className="plane-image"
          src={photo.src}
          alt=""
          draggable={false}
          decoding="async"
        />
      </div>

      <div className="plane-index">{String(index).padStart(2, '0')}</div>

      <div className="label-container">
        <div className="label-line" />
        <div className="label-text">
          <ScrambleText text={photo.title} active={isHovered} />
        </div>
      </div>
    </div>
  )
}

export default function Planes({ onOpen }) {
  const isStatic = useMediaQuery('(max-width: 720px), (prefers-reduced-motion: reduce)')
  const trackRef = useRef(null)
  const planeRefs = useRef([])
  const lifts = useRef([])
  const render = useRef(() => {})
  const [hovered, setHovered] = useState(null)

  const { contextSafe } = useGSAP(
    () => {
      const track = trackRef.current
      const planes = planeRefs.current
      if (isStatic || !track) return

      // Driven from 0 to -SPAN: one full cycle of the row per pinned run.
      const row = { x: 0 }
      const wave = planes.map(() => 0)
      // One reusable quickTo per plane for the hover lift, rather than a fresh
      // tween on every mouse-enter.
      const lift = planes.map(() => ({ y: 0 }))
      lifts.current = lift.map((l) =>
        gsap.quickTo(l, 'y', {
          duration: 0.45,
          ease: 'power3.out',
          onUpdate: () => render.current(),
        }),
      )

      // quickSetter skips GSAP's per-call parsing; this runs 30 times a frame.
      const set = planes.map((el) => ({
        x: gsap.quickSetter(el, 'x', 'px'),
        y: gsap.quickSetter(el, 'y', 'px'),
        z: gsap.quickSetter(el, 'z', 'px'),
      }))
      gsap.set(planes, { rotationY: -50, force3D: true })

      render.current = () => {
        for (let i = 0; i < planes.length; i++) {
          const centered = wrapRow(i * STEP + row.x)
          set[i].x(centered)
          set[i].y(centered * -0.35 + wave[i] + lift[i].y)
          set[i].z(centered * -1.2)
        }
      }

      let lastX = 0
      const tick = (time, deltaTime) => {
        const dt = Math.max(deltaTime, 1) / 1000
        const velocity = (row.x - lastX) / dt
        lastX = row.x

        // Row still and the wave at rest: leave the DOM alone.
        if (velocity === 0 && wave.every((w) => w === 0)) return

        const k = 1 - Math.exp(-dt / WAVE_LAG)
        for (let i = 0; i < planes.length; i++) {
          // A function of where the plane sits in the row and how fast the row
          // is moving, so the crest travels along it, not with it.
          const centered = wrapRow(i * STEP + row.x)
          const phase = Math.sin((centered / (SPAN / 2)) * Math.PI * 2)
          const target = (velocity / 50) * phase * 5
          wave[i] += (target - wave[i]) * k
          if (target === 0 && Math.abs(wave[i]) < 0.01) wave[i] = 0
        }
        render.current()
      }

      gsap.to(row, {
        x: -SPAN,
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: SCROLL_LAG,
        },
      })

      // The row is on screen for longer than its own scroll range (the pin
      // enters and leaves the viewport too), so the loop runs for the track's
      // whole visible life and sleeps the rest of the time.
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) =>
          self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick),
      })

      render.current()
      return () => gsap.ticker.remove(tick)
    },
    { dependencies: [isStatic], revertOnUpdate: true },
  )

  // Runs after useGSAP has, so contextSafe keeps anything it starts inside the
  // context, killed on unmount like everything else.
  const onHover = contextSafe((index) => {
    setHovered(index)
    lifts.current.forEach((liftTo, i) => liftTo(i === index ? -30 : 0))
  })

  return (
    <section
      className={`planes${isStatic ? ' is-static' : ''}`}
      id="reel"
      aria-labelledby="planes-title"
    >
      <div className="planes-intro shell reveal">
        <p className="eyebrow">Scroll velocity</p>
        <h2 className="planes-title" id="planes-title">
          Nights on
          <br />
          the long walk
        </h2>
        <p className="planes-count">({TOTAL_PLANES} frames)</p>
      </div>

      {isStatic ? (
        // No perspective, no pinning: the same photographs as a swipeable strip.
        <div className="planes-strip">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              className="planes-card"
              onClick={() => onOpen(photos, i)}
              aria-label={`Open ${photo.title} at full size`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              <span className="planes-card-name">{photo.title}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="planes-track" ref={trackRef}>
          <div className="planes-pin">
            {/* Decorative: the row shows the first 10 of the manifest, and the
                grid below is the accessible route to every photograph. */}
            <div className="planes-viewport" aria-hidden="true">
              <div className="planes-stage">
                {Array.from({ length: TOTAL_PLANES }, (_, i) => {
                  const photoIndex = i % photos.length
                  return (
                    <Plane
                      key={i}
                      index={i}
                      photo={photos[photoIndex]}
                      isHovered={hovered === i}
                      planeRef={(el) => (planeRefs.current[i] = el)}
                      onHover={onHover}
                      onOpen={() => onOpen(photos, photoIndex)}
                    />
                  )
                })}
              </div>
            </div>

            <p className="planes-hint" aria-hidden="true">
              scroll to surf
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
