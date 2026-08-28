import { useEffect } from 'react'

/**
 * Fades elements in as they enter the viewport. Elements opt in with
 * `className="reveal"`; the observer adds `is-in` once, then stops watching.
 * The base stylesheet only hides `.reveal` under `html.js`, so with JS
 * disabled everything stays visible.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal:not(.is-in)')
    if (!targets.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
