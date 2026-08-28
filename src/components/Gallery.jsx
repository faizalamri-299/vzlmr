import { useMemo, useState } from 'react'
import { categories, photos } from '../data/photos'

export default function Gallery({ onOpen }) {
  const [active, setActive] = useState('all')

  const shown = useMemo(
    () => (active === 'all' ? photos : photos.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section className="section shell" id="work">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>The archive</h2>
        </div>

        <div className="filters" role="group" aria-label="Filter photographs by category">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="filter"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="gallery-empty">Nothing filed under that yet.</p>
      ) : (
        <div className="gallery">
          {shown.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              className="tile reveal"
              style={{ transitionDelay: `${Math.min(i, 6) * 70}ms` }}
              onClick={() => onOpen(shown, i)}
              aria-label={`Open ${photo.title} at full size`}
            >
              <span className="tile-frame">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </span>
              <span className="tile-caption">
                <strong>{photo.title}</strong>
                <span>
                  {photo.location} &middot; {photo.year}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
