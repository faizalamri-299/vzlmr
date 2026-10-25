import { useRef } from 'react'
import { photos } from '../data/photos'
import { Flip, gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * The first screen is a contact sheet laid out as a bento wall, with the
 * wordmark on one line laid over the photographs at the bottom centre (after
 * fudo.tree-public-squares.com, the user's reference). It began as two huge
 * lines over the left of the wall with a tagline, which hid too much of the
 * photos, then sat in a solid band underneath, which the user disliked.
 *
 * Scrolling holds the screen and zooms into the key frame, after GSAP's
 * "Scrubbed bento gallery" demo: Flip records the wall's final layout (the key
 * frame spanning the viewport, its neighbours pushed out past the edges) and
 * the scroll scrubs from the bento to that. The wordmark drops away on the way,
 * and the key frame's caption arrives once it fills the screen.
 *
 * The frames are real buttons into the lightbox, so the wall is a way in to the
 * work rather than a backdrop.
 */

/**
 * Nine frames; the first is the key frame at the centre (`h` in both grids).
 * It ends up filling a landscape screen, so it is the photo flagged `hero` in the
 * manifest; a tall one is cropped to its middle band, so pick one whose subject
 * sits there. Without a flag it falls back to the first landscape photo.
 */
const KEY = photos.find((p) => p.hero) ?? photos.find((p) => p.width > p.height) ?? photos[0]
const FRAMES = [KEY, ...photos.filter((p) => p !== KEY)].slice(0, 9)
const AREAS = ['h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i']

/** Scroll distance the zoom holds the screen for, as a share of the viewport. */
const HOLD = 1.5

export default function Hero({ onOpen }) {
  const heroRef = useRef(null)

  useGSAP(
    () => {
      const hero = heroRef.current
      const sheet = hero.querySelector('.sheet')
      const frames = gsap.utils.toArray('.sheet-frame', hero)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The page's one unprompted moment: frames develop in at random, then
        // the wordmark rises into place. Runs before first paint, so nothing
        // flashes. It moves the line's glyphs, never the mark itself, which the
        // zoom moves: one property, one owner.
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(frames, { opacity: 0, duration: 0.9, stagger: { each: 0.06, from: 'random' } })
          .from(
            '.hero-mark-line > span',
            { yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.12 },
            0.35,
          )

        // Flip measures in pixels, so the zoom is rebuilt whenever the width
        // changes (not the height: a phone's address bar would rebuild it
        // mid-scroll).
        let zoom
        const build = () => {
          zoom?.revert()
          zoom = gsap.context(() => {
            sheet.classList.add('is-final')
            const final = Flip.getState(frames)
            sheet.classList.remove('is-final')

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: hero,
                  start: 'top top',
                  end: () => `+=${window.innerHeight * HOLD}`,
                  scrub: 0.6,
                  pin: true,
                  anticipatePin: 1,
                },
              })
              // `absolute` lifts the frames out of the grid while they move:
              // Flip grows them with inline widths, and in flow those widths
              // would stretch the 1fr tracks and shove every frame off course.
              .add(
                Flip.to(final, { duration: 1, ease: 'power1.inOut', simple: true, absolute: true }),
                0,
              )
              .to('.hero-mark', { yPercent: 60, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
              .to('.is-key .sheet-shade', { opacity: 0, duration: 0.6 }, 0.2)
              .fromTo(
                '.hero-focus',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
                0.78,
              )
          }, hero)
        }
        build()

        let width = window.innerWidth
        let timer = 0
        const onResize = () => {
          if (window.innerWidth === width) return
          width = window.innerWidth
          clearTimeout(timer)
          timer = setTimeout(() => {
            build()
            ScrollTrigger.refresh()
          }, 200)
        }
        window.addEventListener('resize', onResize)

        return () => {
          window.removeEventListener('resize', onResize)
          clearTimeout(timer)
          zoom?.revert()
        }
      })
    },
    { scope: heroRef },
  )

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="sheet">
        {FRAMES.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className={`sheet-frame${i === 0 ? ' is-key' : ''}`}
            style={{ gridArea: AREAS[i] }}
            onClick={() => onOpen(FRAMES, i)}
            aria-label={`Open ${photo.title} at full size`}
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes={i === 0 ? '100vw' : '(max-width: 720px) 34vw, 33vw'}
              alt=""
              width={photo.width}
              height={photo.height}
              decoding="async"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
            />
            <span className="sheet-shade" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Lowercase in the source and uppercased by CSS, like every wordmark here. */}
      <h1 className="hero-mark" aria-label="vzlmr, photography by Faizal Amri">
        <span className="hero-mark-line" aria-hidden="true">
          <span>vzlmr</span>
        </span>
      </h1>

      {/* Hidden until the key frame fills the screen; the zoom brings it in. */}
      <p className="hero-focus" aria-hidden="true">
        <strong>{KEY.title}</strong>
        <span>
          {KEY.location}, {KEY.year}
        </span>
      </p>
    </section>
  )
}
