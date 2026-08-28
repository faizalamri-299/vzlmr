import { useCallback, useEffect, useRef, useState } from 'react'

const Chevron = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Full-screen viewer. `items` is the currently filtered photo list, so
 * arrowing through the lightbox matches what the grid is showing.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const [touchX, setTouchX] = useState(null)
  const dialogRef = useRef(null)
  const restoreTo = useRef(null)

  const photo = items[index]
  const atStart = index === 0
  const atEnd = index === items.length - 1

  const go = useCallback(
    (delta) => {
      const next = index + delta
      if (next >= 0 && next < items.length) onIndex(next)
    },
    [index, items.length, onIndex],
  )

  // Keyboard: escape closes, arrows step, tab is trapped inside the dialog.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowLeft') return go(-1)
      if (e.key === 'ArrowRight') return go(1)
      if (e.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not(:disabled), [href]',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Lock the page behind the overlay, and hand focus back where it came from.
  useEffect(() => {
    restoreTo.current = document.activeElement
    document.body.classList.add('is-locked')
    dialogRef.current?.querySelector('.lb-close')?.focus()

    return () => {
      document.body.classList.remove('is-locked')
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus()
    }
  }, [])

  // Warm the neighbouring frames so stepping through feels instant.
  useEffect(() => {
    ;[items[index - 1], items[index + 1]].forEach((p) => {
      if (!p) return
      const img = new Image()
      img.src = p.src
    })
  }, [index, items])

  if (!photo) return null

  const onTouchEnd = (e) => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
    setTouchX(null)
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title}, image ${index + 1} of ${items.length}`}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lb-bar">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button type="button" className="lb-btn lb-close" onClick={onClose}>
          Close
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        className="lb-stage"
        onTouchStart={(e) => setTouchX(e.changedTouches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          className="lb-btn lb-nav prev"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Previous photograph"
        >
          <Chevron dir="prev" />
        </button>

        <img key={photo.id} src={photo.src} alt={photo.alt} />

        <button
          type="button"
          className="lb-btn lb-nav next"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next photograph"
        >
          <Chevron dir="next" />
        </button>
      </div>

      <div className="lb-foot">
        <h3>{photo.title}</h3>
        <p>
          {photo.location} &middot; {photo.year} &middot; {photo.category}
        </p>
      </div>
    </div>
  )
}
