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
import Rail from './components/Rail'
import { useReveal } from './hooks/useReveal'
import { smoothScroller, useSmoothScroll } from './lib/smooth'

export default function App() {
  // `items` is whatever the gallery had filtered when a tile was clicked, so
  // the lightbox arrows walk the same set the visitor is looking at.
  const [viewer, setViewer] = useState(null)
  // The archive's filter lives here so the category index further down can
  // set it and send the visitor up to the grid.
  const [category, setCategory] = useState('all')

  // The footer sits under this and is uncovered as it scrolls away, so the
  // footer needs to watch it.
  const contentRef = useRef(null)

  useReveal([])
  useSmoothScroll()

  // The lightbox locks the page with overflow: hidden, which Lenis's own
  // scrolling ignores, so it is paused for as long as the viewer is open.
  const viewing = viewer !== null
  useEffect(() => {
    const lenis = smoothScroller()
    if (!lenis) return
    if (viewing) lenis.stop()
    else lenis.start()
  }, [viewing])

  // Mark the document so CSS knows JS is running (see `.js .reveal`).
  useEffect(() => {
    document.documentElement.classList.add('js')
  }, [])

  const open = (items, index) => setViewer({ items, index })

  const pickCategory = (id) => {
    setCategory(id)
    const lenis = smoothScroller()
    if (lenis) lenis.scrollTo('#work', { offset: -40 })
    else document.getElementById('work')?.scrollIntoView()
  }

  return (
    <div className="page">
      <a className="skip-link" href="#work">
        Skip to the photographs
      </a>

      <Header />
      <Rail />

      <main className="content" ref={contentRef}>
        <Hero onOpen={open} />
        <Planes onOpen={open} />
        <Gallery onOpen={open} active={category} onActive={setCategory} />
        <TextLines onPick={pickCategory} />
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
