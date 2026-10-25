import { useEffect, useState } from 'react'

const matchesNow = (query) => window.matchMedia?.(query).matches ?? false

/**
 * Reports whether a media query currently matches, and keeps reporting as the
 * window changes. Answers on the first render: the page ships an empty root,
 * so there is no server markup to match, and starting `false` let the reel
 * mount in its 3800px desktop form on phones and then shrink, after
 * ScrollTrigger had measured, leaving every scene below it ~3000px too low.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => matchesNow(query))

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
