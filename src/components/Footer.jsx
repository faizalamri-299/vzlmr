import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const COLUMNS = [
  { title: 'Work', links: ['Landscape', 'Portrait', 'Street', 'Architecture'] },
  { title: 'Studio', links: ['About', 'Prints', 'Commissions', 'Journal'] },
  { title: 'Elsewhere', links: ['Instagram', 'Newsletter', 'Contact'] },
]

const LEGAL = ['Privacy', 'Terms', 'Licensing']

/**
 * Footer reveal, after motion.dev's example: the footer sticks under the page at
 * `z-index: -1` and the content scrolls off it. Opacity, scale and blur scrub
 * from 0 / 0.9 / 6px to 1 / 1 / 0 across one footer-height of scroll, so it
 * resolves into focus rather than simply sliding into view.
 *
 * One footer-height is also exactly how far you *can* scroll past the
 * content's end, so the reveal lands on 1.0 at the very bottom of the page.
 */
export default function Footer({ contentRef }) {
  const footerRef = useRef(null)

  useGSAP(
    () => {
      const footer = footerRef.current
      if (!footer || !contentRef.current) return

      // Reduced motion gets the footer as plain, fully visible content.
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'bottom bottom',
              // A function so a resize or late font swap re-measures the footer.
              end: () => `+=${footer.offsetHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo('.footer-fade', { opacity: 0 }, { opacity: 1 }, 0)
          .fromTo(
            '.footer-scale',
            { scale: 0.9, filter: 'blur(6px)' },
            { scale: 1, filter: 'blur(0px)', transformOrigin: '50% 100%' },
            0,
          )
      })
    },
    { scope: footerRef },
  )

  return (
    <footer className="reveal-footer" ref={footerRef}>
      <div className="footer-fade">
        <div className="footer-scale">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="footer-wordmark">vzlmr</span>
              <p>
                Landscape, portrait and street photography from Kuala Lumpur.
                Commissions, editorial work and prints.
              </p>
            </div>

            <div className="footer-cols">
              {COLUMNS.map((column) => (
                <div className="footer-col" key={column.title}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.links.map((label) => (
                      <li key={label}>
                        <a href="#work">{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="footer-legal">
              <span>&copy; {new Date().getFullYear()} vzlmr</span>
              <ul>
                {LEGAL.map((label) => (
                  <li key={label}>
                    <a href="#contact">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
