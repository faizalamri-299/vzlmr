/**
 * The photo manifest. This is the only file you need to touch to change the gallery.
 *
 * To use your own images:
 *   1. Drop the files into `public/photos/` (e.g. public/photos/dune-01.jpg)
 *   2. Set `src` to "/photos/dune-01.jpg"
 *   3. Set `width`/`height` to the image's real pixel dimensions — the grid uses
 *      them to reserve space before the image loads, which stops the layout jumping.
 *
 * The placeholder URLs below point at fixed picsum images chosen to fit each
 * category, so the demo looks the same on every reload. Delete them once your own photos are in.
 */

// Picked by eye from picsum's catalogue to match each category.
const p = (id, w, h) => `https://picsum.photos/id/${id}/${w}/${h}`

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
    src: p(525, 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'Climbers strung along the crest of a red dune',
    title: 'First Light, Sossusvlei',
    location: 'Namib Desert',
    year: 2024,
    category: 'landscape',
  },
  {
    id: 'atrium',
    src: p(546, 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'Vaulted cloister with low sun falling across the arches',
    title: 'Cloister, Late Sun',
    location: 'Lisbon',
    year: 2023,
    category: 'architecture',
  },
  {
    id: 'nadia',
    src: p(548, 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Woman in silhouette turned toward a fire',
    title: 'Nadia, by the Fire',
    location: 'Terengganu',
    year: 2024,
    category: 'portrait',
  },
  {
    id: 'crossing',
    src: p(690, 1600, 1000),
    width: 1600,
    height: 1000,
    alt: 'Shoppers and a passing bus on a street at dusk',
    title: 'Crossing at Dusk',
    location: 'London',
    year: 2025,
    category: 'street',
  },
  {
    id: 'fjord',
    src: p(472, 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'Low cloud sitting between two dark ridges',
    title: 'Weather Coming In',
    location: 'Lofoten',
    year: 2023,
    category: 'landscape',
  },
  {
    id: 'stairwell',
    src: p(679, 1200, 1200),
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
    src: p(195, 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'Night market lane under strings of hanging bulbs',
    title: 'Half Past Ten',
    location: 'Penang',
    year: 2025,
    category: 'street',
  },
  {
    id: 'hands',
    src: p(674, 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Cupped hands holding a bunch of dark grapes',
    title: 'Harvest',
    location: 'Douro Valley',
    year: 2024,
    category: 'portrait',
  },
  {
    id: 'saltflat',
    src: p(507, 1600, 1067),
    width: 1600,
    height: 1067,
    alt: 'A fjord seen from the cliff edge high above it',
    title: 'Nothing For Miles',
    location: 'Lysefjord',
    year: 2022,
    category: 'landscape',
  },
  {
    id: 'rain',
    src: p(171, 1200, 1600),
    width: 1200,
    height: 1600,
    alt: 'City lights blurred through a rain-streaked window',
    title: 'Monsoon, Interrupted',
    location: 'Singapore',
    year: 2025,
    category: 'street',
  },
  {
    id: 'brutal',
    src: p(677, 1600, 1200),
    width: 1600,
    height: 1200,
    alt: 'Four concrete towers framing a cross of sky',
    title: 'Repetition Study',
    location: 'Berlin',
    year: 2023,
    category: 'architecture',
  },
  {
    id: 'quiet',
    src: p(602, 1200, 1500),
    width: 1200,
    height: 1500,
    alt: 'Backlit portrait of a young man in profile',
    title: 'Between Takes',
    location: 'Studio 12',
    year: 2025,
    category: 'portrait',
  },
]

export const heroPhoto = p(546, 2400, 1400)
