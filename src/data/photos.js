/**
 * The photo manifest. This is the only file you need to touch to change the gallery.
 *
 * To use your own images:
 *   1. Drop the files into `public/photos/` (e.g. public/photos/merdeka-118.jpg)
 *   2. Set `src` to "/photos/merdeka-118.jpg"
 *   3. Set `width`/`height` to the image's real pixel dimensions — the grid uses
 *      them to reserve space before the image loads, which stops the layout jumping.
 *
 * Photos are the author's own, from VSCO, re-saved without their metadata.
 */

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
    src: '/photos/merdeka-118.jpg',
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
    src: '/photos/concorde.jpg',
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
    src: '/photos/balcony.jpg',
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
    src: '/photos/floating-mosque.jpg',
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
    src: '/photos/flight-path.jpg',
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
    src: '/photos/under-clouds.jpg',
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
    src: '/photos/jalur-gemilang.jpg',
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
    src: '/photos/parakeet.jpg',
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
    src: '/photos/african-grey.jpg',
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
    src: '/photos/jawi-pole.jpg',
    width: 1536,
    height: 2048,
    alt: 'Lines of Jawi handwriting on a lamp post beside a busy road',
    title: 'Written on the Pole',
    location: 'Kuala Lumpur',
    year: 2024,
    category: 'street',
  },
]
