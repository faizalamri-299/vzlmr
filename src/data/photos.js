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

// The widths scripts/photos.py writes: 480 and 960 where the master is wider,
// then its own width up to 1536. Every <img> gets the srcset and picks a size
// from its `sizes`.
const photo = (name, width) => {
  const widths = [...[480, 960].filter((w) => w < width), Math.min(1536, width)]
  return {
    src: `/photos/${name}-${widths.at(-1)}.webp`,
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

// `focus` (optional) is an object-position for the hero's cover crop.
// Order matters: `hero` marks the frame the hero zooms into and `about` the
// About image; the hero wall shows the first nine, the reel the first ten, and
// each category row's cover is that category's first photo. Petronas at night
// is only 720px wide (Instagram's largest), so it stays out of those spots.
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
  },
  {
    id: 'macaw',
    ...photo('macaw', 1440),
    width: 1440,
    height: 1440,
    alt: 'A blue-and-yellow macaw preening on a perch',
    title: 'Blue and Gold',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
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
    id: 'cat',
    ...photo('street-cat', 1440),
    width: 1440,
    height: 1920,
    alt: 'A white and ginger cat lying upside down, looking at the camera',
    title: 'Upside Down',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'street',
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
    id: 'tiger',
    ...photo('tiger', 1440),
    width: 1440,
    height: 1440,
    alt: 'A tiger walking along the edge of a pool',
    title: 'Tiger',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
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
    id: 'moonrise',
    ...photo('mosque-moonrise', 1440),
    width: 1440,
    height: 1727,
    alt: 'A mosque lit up at night under a bright moon, at the end of a dark street',
    title: 'Moonrise',
    location: 'Shah Alam',
    year: 2026,
    category: 'street',
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
    id: 'petronas',
    ...photo('petronas-night', 720),
    width: 720,
    height: 888,
    alt: 'The Petronas Towers lit up at night above a glowing shopfront',
    title: 'Twin Towers, After Dark',
    location: 'Kuala Lumpur',
    year: 2025,
    category: 'city',
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
    hero: true,
    // The flag sits above the middle; on a wide screen the cover crop keeps
    // only a middle band, so lift the band to clear the header.
    focus: 'center 38%',
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
  {
    id: 'hopper',
    ...photo('leaf-hopper', 1440),
    width: 1440,
    height: 1440,
    alt: 'A small orange insect resting on a long green leaf',
    title: 'On the Blade',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
  {
    id: 'siamang',
    ...photo('siamang', 1440),
    width: 1440,
    height: 1440,
    alt: 'A gibbon sitting hunched on a platform behind wire mesh',
    title: 'Behind the Mesh',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
  {
    id: 'lily',
    ...photo('water-lily', 1440),
    width: 1440,
    height: 1440,
    alt: 'A purple water lily opening among reeds and lily pads',
    title: 'Water Lily',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
  {
    id: 'puff',
    ...photo('powder-puff', 1440),
    width: 1440,
    height: 1440,
    alt: 'A red powder-puff flower hanging among green leaves',
    title: 'Powder Puff',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'wildlife',
  },
]
