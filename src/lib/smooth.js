import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './gsap'

let current = null
/** The page's smooth scroller, while there is one (none with reduced motion). */
export const smoothScroller = () => current

/**
 * Smooth wheel scrolling (Lenis), set up as in the user's jemputlah project:
 * Lenis runs on GSAP's ticker and reports every move to ScrollTrigger, so the
 * scrubbed scenes stay in step. Touch keeps the phone's own scrolling, and the
 * page still scrolls natively underneath, so CSS sticky (the planes) and the
 * header's scroll listener behave as before. `anchors` glides the # links.
 * Off for people who ask for reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The stylesheet's `scroll-behavior: smooth` would fight Lenis's own easing.
    document.documentElement.style.scrollBehavior = 'auto'
    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 })
    current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      current = null
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])
}
