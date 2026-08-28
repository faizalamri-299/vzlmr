import { photos } from '../data/photos'

export default function About() {
  const portrait = photos.find((p) => p.category === 'portrait') ?? photos[0]

  return (
    <section className="section shell" id="about">
      <div className="about">
        <div className="about-portrait reveal">
          <img src={portrait.src} alt="Faizal Amri at work" loading="lazy" />
        </div>

        <div className="about-body reveal">
          <p className="eyebrow">About</p>
          <p>
            Landscape, portrait and street photography. Based in Kuala Lumpur.
          </p>
          <p>Available light. One lens. More waiting than shooting.</p>

          {/* A div, not a p: `.about-body p:not(.eyebrow)` would style this as
              body copy. Same specificity trap the eyebrow already hit once. */}
          <div className="about-meta">
            Commissions &middot; Editorial &middot; Prints
          </div>
        </div>
      </div>
    </section>
  )
}
