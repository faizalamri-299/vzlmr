/**
 * The photo manifest. This is the only file you need to touch to change the gallery.
 *
 * To use your own images:
 *   1. Drop the files into `public/photos/` (e.g. public/photos/dune-01.jpg)
 *   2. Set `src` to "/photos/dune-01.jpg"
 *   3. Set `width`/`height` to the image's real pixel dimensions — the grid uses
 *      them to reserve space before the image loads, which stops the layout jumping.
 *
 * The placeholder URLs below are stable (seeded), so the demo looks the same on
 * every reload. Delete them once your own photos are in.
 */

const p = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'street', label: 'Street' },
  { id: 'architecture', label: 'Architecture' },
]

export const photos = [
  {
    id: 'dune',
    src: p('alum-dune', 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'Wind-carved ridgeline of a dune at first light',
    title: 'First Light, Sossusvlei',
    location: 'Namib Desert',
    year: 2024,
    category: 'landscape',
  },
  {
    id: 'atrium',
    src: p('alum-atrium', 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'Concrete atrium with a shaft of light falling across a stairwell',
    title: 'Atrium No. 4',
    location: 'Lisbon',
    year: 2023,
    category: 'architecture',
  },
  {
    id: 'nadia',
    src: p('alum-nadia', 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Portrait of a woman turning toward a window',
    title: 'Nadia, by the Window',
    location: 'Studio 12',
    year: 2024,
    category: 'portrait',
  },
  {
    id: 'crossing',
    src: p('alum-crossing', 1600, 1000),
    width: 1600,
    height: 1000,
    alt: 'Pedestrians crossing a wet street at dusk',
    title: 'Crossing at Dusk',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'street',
  },
  {
    id: 'fjord',
    src: p('alum-fjord', 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'Low cloud sitting between two dark fjord walls',
    title: 'Weather Coming In',
    location: 'Lofoten',
    year: 2023,
    category: 'landscape',
  },
  {
    id: 'stairwell',
    src: p('alum-stair', 1200, 1200),
    width: 1200,
    height: 1200,
    alt: 'Spiral stairwell photographed from directly below',
    title: 'Descent',
    location: 'Porto',
    year: 2024,
    category: 'architecture',
  },
  {
    id: 'vendor',
    src: p('alum-vendor', 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'Night market vendor lit by a single hanging bulb',
    title: 'One Bulb, Half Past Ten',
    location: 'Penang',
    year: 2025,
    category: 'street',
  },
  {
    id: 'hands',
    src: p('alum-hands', 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Close portrait of weathered hands resting on a table',
    title: 'Forty Years of Work',
    location: 'Terengganu',
    year: 2024,
    category: 'portrait',
  },
  {
    id: 'saltflat',
    src: p('alum-salt', 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'Mirror-flat salt pan reflecting an empty sky',
    title: 'Nothing For Miles',
    location: 'Uyuni',
    year: 2022,
    category: 'landscape',
  },
  {
    id: 'rain',
    src: p('alum-rain', 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'Figure with an umbrella against a rain-streaked window',
    title: 'Monsoon, Interrupted',
    location: 'Singapore',
    year: 2025,
    category: 'street',
  },
  {
    id: 'brutal',
    src: p('alum-brutal', 1600, 1200),
    width: 1600,
    height: 1200,
    alt: 'Repeating concrete balconies in raking afternoon light',
    title: 'Repetition Study',
    location: 'Belgrade',
    year: 2023,
    category: 'architecture',
  },
  {
    id: 'quiet',
    src: p('alum-quiet', 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Backlit portrait of a young man in profile',
    title: 'Between Takes',
    location: 'Studio 12',
    year: 2025,
    category: 'portrait',
  },
]

export const heroPhoto = p('alum-hero', 2400, 1400)
