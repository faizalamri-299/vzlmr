import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
]

export default function Header() {
  const [stuck, setStuck] = useState(false)
  // The hero is the wordmark at full size, so the small one waits until it
  // has scrolled most of the way off.
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 40)
      setPastHero(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`site-header${stuck ? ' is-stuck' : ''}${pastHero ? ' is-past-hero' : ''}`}
    >
      <a className="wordmark" href="#top">
        vzl<span>mr</span>
      </a>
      <nav className="nav" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact">
          Enquire
        </a>
      </nav>
    </header>
  )
}
