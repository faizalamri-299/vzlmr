import { useEffect, useState } from 'react'

/**
 * Reports whether a media query currently matches, and keeps reporting as the
 * window changes. Starts `false` so the first paint matches the "no JS yet"
 * markup, then settles on the real answer in the effect.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return

    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)

    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  return matches
}
