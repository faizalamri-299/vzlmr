import { heroPhoto } from '../data/photos'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero-bg"
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />

      <div className="hero-inner shell">
        <p className="eyebrow">Photography &middot; Est. 2016</p>
        <h1>
          Light, held
          <br />
          <em>still</em>
        </h1>
        <p className="hero-sub">
          Landscape, portrait and street work. <br/>
            Made on long walks, slow mornings and the occasional very bad idea.
        </p>
        <div className="hero-meta">
          <span>Kuala Lumpur, Malaysia</span>
        </div>
      </div>

      <a className="scroll-cue" href="#work">
        Scroll
      </a>
    </section>
  )
}
