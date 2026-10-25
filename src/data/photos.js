/**
 * The photo manifest. This is the only file you need to touch to change the gallery.
 *
 * To add a photo:
 *   1. Drop the full-size JPEG into `photos-src/` (e.g. photos-src/merdeka-118.jpg)
 *   2. Run `python scripts/photos.py` to build its WebP sizes into public/photos/
 *   3. Add an entry with `...photo('merdeka-118', width)` and set `width`/`height` to
 *      the master's real pixel dimensions — the grid uses them to reserve space
 *      before the image loads, which stops the layout jumping.
 *
 * Photos are the author's own, from VSCO, re-saved without their metadata.
 */

// The widths scripts/photos.py writes: 480, 960 and the master's own width up
// to 1536. Every <img> gets the srcset and picks a size from its `sizes`.
const photo = (name, width) => {
  const widths = [480, 960, Math.min(1536, width)]
  return {
    src: `/photos/${name}-${widths[2]}.webp`,
    srcSet: widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(', '),
  }
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'city', label: 'City' },
  { id: 'sky', label: 'Sky' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'street', label: 'Street' },
]

// Order matters: `hero` marks the frame the hero zooms into and `about` the
// About portrait; each category row's cover is that category's first photo.
export const photos = [
  {
    id: 'merdeka',
    ...photo('merdeka-118', 1536),
    width: 1536,
    height: 2048,
    alt: 'Merdeka 118 rising into a broken sky above the evening traffic',
    title: 'Merdeka 118',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'city',
    hero: true,
  },
  {
    id: 'concorde',
    ...photo('concorde', 1536),
    width: 1536,
    height: 2048,
    alt: 'Hotel and office towers converging overhead',
    title: 'Looking Up, Jalan Sultan Ismail',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'city',
  },
  {
    id: 'balcony',
    ...photo('balcony', 1536),
    width: 1536,
    height: 2048,
    alt: 'The city skyline with the Petronas Towers seen from a high balcony',
    title: 'From the Balcony',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'city',
    about: true,
  },
  {
    id: 'mosque',
    ...photo('floating-mosque', 1366),
    width: 1366,
    height: 2048,
    alt: 'A white mosque and its minaret reflected in still water',
    title: 'Floating Mosque',
    location: 'Kuala Terengganu',
    year: 2025,
    category: 'city',
  },
  {
    id: 'flight-path',
    ...photo('flight-path', 1366),
    width: 1366,
    height: 2048,
    alt: 'A plane crossing a deep blue sky between power lines and a flagpole',
    title: 'Flight Path',
    location: 'Kuala Lumpur',
    year: 2026,
    category: 'sky',
  },
  {
    id: 'under-clouds',
    ...photo('under-clouds', 1366),
    width: 1366,
    height: 2048,
    alt: 'A plane passing under a field of small clouds',
    title: 'Under the Clouds',
    location: 'Kuala Lumpur',
    year: 2026,
    category: 'sky',
  },
  {
    id: 'flag',
    ...photo('jalur-gemilang', 1366),
    width: 1366,
    height: 2048,
    alt: 'The Malaysian flag flying against a clear blue sky',
    title: 'Jalur Gemilang',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'sky',
  },
  {
    id: 'parakeet',
    ...photo('parakeet', 1366),
    width: 1366,
    height: 2048,
    alt: 'A ring-necked parakeet perched on a branch, its long tail hanging down',
    title: 'Ring-necked',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
  {
    id: 'grey',
    ...photo('african-grey', 1366),
    width: 1366,
    height: 2048,
    alt: 'An African grey parrot looking down from a branch',
    title: 'African Grey',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
  {
    id: 'pole',
    ...photo('jawi-pole', 1536),
    width: 1536,
    height: 2048,
    alt: 'Lines of Jawi handwriting on a lamp post beside a busy road',
    title: 'Written on the Pole',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'street',
  },
]
