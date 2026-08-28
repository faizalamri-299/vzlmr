import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Planes from './components/Planes'
import Gallery from './components/Gallery'
import TextLines from './components/TextLines'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import { useReveal } from './hooks/useReveal'

export default function App() {
  // `items` is whatever the gallery had filtered when a tile was clicked, so
  // the lightbox arrows walk the same set the visitor is looking at.
  const [viewer, setViewer] = useState(null)

  // The footer sits under this and is uncovered as it scrolls away, so the
  // footer needs to watch it.
  const contentRef = useRef(null)

  useReveal([])

  // Mark the document so CSS knows JS is running (see `.js .reveal`).
  useEffect(() => {
    document.documentElement.classList.add('js')
  }, [])

  const open = (items, index) => setViewer({ items, index })

  return (
    <div className="page">
      <a className="skip-link" href="#work">
        Skip to the photographs
      </a>

      <Header />

      <main className="content" ref={contentRef}>
        <Hero />
        <Planes onOpen={open} />
        <Gallery onOpen={open} />
        <TextLines />
        <About />
        <Contact />
      </main>

      <Footer contentRef={contentRef} />

      {viewer && (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onIndex={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  )
}
