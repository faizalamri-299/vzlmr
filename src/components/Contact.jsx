import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'

const EMAIL = 'hello@vzlmr.com'

const DETAILS = [
  { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
  { k: 'Instagram', v: '@vzlmr', href: 'https://instagram.com' },
  { k: 'Based in', v: 'Kuala Lumpur, MY' },
  { k: 'Response', v: 'Within 2 working days' },
]

/**
 * The address is the headline: set nearly full-width, its letters rise out of
 * a mask one after another as it scrolls up to meet you. The details sit under
 * it in a ruled four-column grid.
 */
export default function Contact() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // `mask` wraps each letter in a clipping box; the class gives that box
        // room for the glyph's full height (see .split-char-mask in the CSS).
        const split = SplitText.create('.contact-mail-text', {
          type: 'chars',
          mask: 'chars',
          charsClass: 'split-char',
        })
        gsap.fromTo(
          split.chars,
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: {
              trigger: '.contact-mail',
              start: 'top 92%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-head">
        <p className="contact-label">Enquiries</p>
        <h2>Let&rsquo;s make something worth keeping.</h2>
        <p className="contact-lede">
          Commissions, editorial assignments, prints and the occasional workshop.
          Tell me roughly what you have in mind and when.
        </p>
      </div>

      <a className="contact-mail" href={`mailto:${EMAIL}`}>
        <span className="contact-mail-text">{EMAIL}</span>
      </a>

      <ul className="contact-details">
        {DETAILS.map((d) => (
          <li key={d.k}>
            <span className="k">{d.k}</span>
            {d.href ? <a href={d.href}>{d.v}</a> : <span>{d.v}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
