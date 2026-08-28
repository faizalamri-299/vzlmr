import { photos } from '../data/photos'

const STATS = [
  { value: '9', label: 'Years shooting' },
  { value: '24', label: 'Countries' },
  { value: '3', label: 'Published series' },
]

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
            I started carrying a camera because I kept losing the details &mdash;
            the way a room sounded, what the light did at four in the afternoon.
            Nine years later that is still the whole job.
          </p>
          <p>
            The work sits somewhere between documentary and portraiture: mostly
            available light, mostly one lens, always more waiting than shooting.
            Commissions, editorial and print sales all welcome.
          </p>

          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
