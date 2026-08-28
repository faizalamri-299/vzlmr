import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
]

export default function Header() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${stuck ? ' is-stuck' : ''}`}>
      <a className="wordmark" href="#top">
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
