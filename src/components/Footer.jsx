import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'

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
 */
export default function Footer({ contentRef }) {
  const footerRef = useRef(null)
  const [revealAt, setRevealAt] = useState(0.35)

  // How much of the scroll past the content's end the reveal should take: one
  // footer-height, expressed as a fraction of the viewport.
  useLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const update = () =>
      setRevealAt(
        Math.min(0.95, Math.max(0.05, footer.offsetHeight / (window.innerHeight || 1))),
      )

    update()
    const ro = new ResizeObserver(update)
    ro.observe(footer)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['end end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, revealAt], [0, 1])
  const scale = useTransform(scrollYProgress, [0, revealAt], [0.9, 1])
  const blur = useTransform(scrollYProgress, [0, revealAt], [6, 0])
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <footer className="reveal-footer" ref={footerRef}>
      <motion.div className="footer-fade" style={{ opacity }}>
        <motion.div
          className="footer-scale"
          style={{ scale, filter, transformOrigin: '50% 100%' }}
        >
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
        </motion.div>
      </motion.div>
    </footer>
  )
}
