import { useRef } from 'react'
import { photos } from '../data/photos'
import { gsap, SplitText, useGSAP } from '../lib/gsap'

const STATEMENT = 'Available light. One lens. More waiting than shooting.'
const SERVICES = ['Commissions', 'Editorial', 'Prints']

/**
 * A hard split: the portrait in a ruled frame on one side, the statement set
 * huge on the other. As the section scrolls through, the portrait wipes up into
 * its frame and drifts inside it, and the statement lights up word by word at
 * reading pace.
 */
export default function About() {
  const sectionRef = useRef(null)
  const portrait = photos.find((p) => p.category === 'portrait') ?? photos[0]

  useGSAP(
    () => {
      const section = sectionRef.current
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.about-frame',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 25%', scrub: 0.5 },
          },
        )
        // `y` on the image, the wipe on its frame: one property, one owner.
        gsap.fromTo(
          '.about-frame img',
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )

        const split = SplitText.create('.about-statement', { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.about-statement',
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-frame">
        <img src={portrait.src} alt="Faizal Amri at work" loading="lazy" decoding="async" />
      </div>

      <div className="about-body">
        <p className="about-label">About</p>
        <p className="about-statement">{STATEMENT}</p>
        <p className="about-lede">
          Landscape, portrait and street photography, based in Kuala Lumpur.
        </p>
        <ul className="about-services" aria-label="Services">
          {SERVICES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
