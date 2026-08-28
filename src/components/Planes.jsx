import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'
import { photos } from '../data/photos'
import { useMediaQuery } from '../hooks/useMediaQuery'
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

function Plane({ index, photo, scrollX, scrollVelocity, isHovered, onHover, onOpen }) {
  const start = index * STEP

  const hoverOffset = useSpring(0, { stiffness: 400, damping: 25 })
  const waveOffset = useSpring(0, { stiffness: 300, damping: 20, mass: 0.3 })

  // The wave is a function of where this plane sits in the row and how fast the
  // row is currently moving — so the crest travels along it, not with it.
  useMotionValueEvent(scrollVelocity, 'change', (velocity) => {
    const centered = wrap(-SPAN / 2, SPAN / 2, start + scrollX.get())
    const wavePhase = Math.sin((centered / (SPAN / 2)) * Math.PI * 2)
    waveOffset.set((velocity / 50) * wavePhase * 5)
  })

  useEffect(() => {
    hoverOffset.set(isHovered ? -30 : 0)
  }, [isHovered, hoverOffset])

  const transform = useTransform(() => {
    const centered = wrap(-SPAN / 2, SPAN / 2, start + scrollX.get())
    const y = centered * -0.35 + waveOffset.get() + hoverOffset.get()
    const z = centered * -1.2
    return `translate3d(${centered}px, ${y}px, ${z}px) rotateY(-50deg)`
  })

  return (
    <motion.div
      className="plane"
      style={{
        transform,
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
      }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      onClick={onOpen}
    >
      <div className="plane-image-container">
        <img className="plane-image" src={photo.src} alt="" draggable={false} />
      </div>

      <div className="plane-index">{String(index).padStart(2, '0')}</div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="label-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="label-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <div className="label-text">
              <ScrambleText text={photo.title} active={isHovered} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Planes({ onOpen }) {
  const isStatic = useMediaQuery('(max-width: 720px), (prefers-reduced-motion: reduce)')
  const trackRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // One full cycle of the row per pinned run, smoothed by the same spring the
  // reference uses — the spring is what gives `useVelocity` something to read.
  const rawScrollX = useTransform(scrollYProgress, [0, 1], [0, -SPAN])
  const scrollX = useSpring(rawScrollX, { stiffness: 100, damping: 30, mass: 0.5 })
  const scrollVelocity = useVelocity(scrollX)

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
                      scrollX={scrollX}
                      scrollVelocity={scrollVelocity}
                      isHovered={hovered === i}
                      onHover={setHovered}
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
