# vzlmr — working knowledge

Everything here is the stuff you **cannot** recover by reading the code: where the
design came from, which numbers are load-bearing, what breaks silently, and how to
verify scroll-driven work in this repo without wasting an hour rediscovering the
traps. Read this before touching `src/`.

Stack: React 19 + Vite 8, `motion` 13 (Framer Motion's successor), plain CSS in one
file. No CSS framework, no test runner. Checks are `npx oxlint` and `npx vite build`.
Dev server: `npm run dev`.

---

## 1. What this site is

A single-page photography portfolio for **vzlmr** (Faizal Amri, Kuala Lumpur).
Sections in order: Hero → Planes (3D surf) → Gallery grid → TextLines band → About →
Contact, then a footer that is revealed from underneath the page.

**The content is placeholder.** `src/data/photos.js` serves seeded picsum URLs, so
the captions do not describe the images — "First Light, Sossusvlei / Namib Desert" is
currently a forest stream. The About stats (9 years, 24 countries, 3 published
series) and "Est. 2016" are invented. Replace the manifest before this goes live;
that file's header comment explains the swap.

---

## 2. Design provenance — read this before restyling anything

The whole visual system is deliberately modelled on **motion.dev's examples**, at the
user's request. Do not "improve" it toward some other aesthetic.

### Palette and type came from motion.dev's own stylesheet

Sampled from `https://examples.motion.dev/assets/index-BuZv3YIA.css` (their example
sandbox). These are exact, not eyeballed:

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0d1111` | page ground |
| `--layer` / `--layer-2` | `#13181a` / `#1a2022` | raised surfaces |
| `--border` | `#1e2427` | hairlines |
| `--foreground` | `#ededec` | text |
| `--foreground-feint` | `#7a8180` | muted text |
| `--hue-1..5` | `#ff0088 #dd00ee #9911ff #1e75f7 #0cdcf7` | their pink→cyan spectrum |
| `--display` | League Gothic | headings, uppercase, `-0.05em` |
| `--sans` | TASA Orbiter | body, with `ss03`/`cv05` on as motion.dev sets them |
| `--mono` | Geist Mono | every kicker, label, counter |

`--hue-1..4` and `--spectrum` are now **unused** (the hero title moved off them);
`--accent: var(--hue-5)` — the cyan `#0cdcf7` in the wordmark's "MR", focus rings and
the About stat numbers — is still live.

### The hero title palette came from an album cover

The user asked for **The New Abnormal** (The Strokes). Its cover is Basquiat's *Bird
on Money* (1981). No published hex values exist, so the `--tna-*` tokens were
extracted by rendering the artwork to a canvas and clustering pixels:

| Token | Value | Note |
| --- | --- | --- |
| `--tna-teal` | `#0399a6` | the field — **teal-cerulean, not cobalt**; it reproduces bluer than it is |
| `--tna-blue` / `--tna-sky` | `#0495c4` / `#38a6d1` | lighter passages |
| `--tna-amber` / `--tna-gold` | `#fcb814` / `#fec60d` | the bird |
| `--tna-bone` | `#c9c49a` | the canvas — largest single share of the cover |
| `--tna-ink` | `#141617` | the scrawl |

**Why the gradient routes through bone:** teal straight into amber crosses `#80a66c`,
a desaturated sage that is nowhere in the painting. Going teal → sky → bone → gold →
amber keeps every midpoint on-palette (`#1d9fbb`, `#80b5b5`, `#e3c553`, `#fdbf10`).
Do not "simplify" it to a two-stop gradient.

### The three implemented Motion examples

| Section | Reference |
| --- | --- |
| `TextLines.jsx` | `examples.motion.dev/vue/scroll-text-lines` |
| `Planes.jsx` | `examples.motion.dev/vue/scroll-velocity-linked-offset` |
| `Footer.jsx` | `examples.motion.dev/react/footer-reveal` |

**These are Motion+ (paid) examples — their source is NOT on the `motion.dev/examples/…`
docs pages.** Fetching those pages gets you metadata and a paywall notice. The source
*is* public in the sandbox bundle: `examples.motion.dev/assets/index-Cpu3CUE2.js` maps
each route to a lazy chunk, and some of those chunks export the original `.vue`/`.tsx`
source as a template string. Grep the bundle for the slug, follow the chunk name, then
extract between the first and last backtick. That is how the exact values in this repo
were obtained — do the same rather than guessing if you need to re-check one.

Two Motion+ *components* used by those examples are paid and were reimplemented here:
`Ticker` (as the loop inside `TextLines.jsx`) and `ScrambleText` (`ScrambleText.jsx`).

---

## 3. Load-bearing numbers and invariants

### Planes — the wrap must stay hidden

`Planes.jsx`: `PLANE_WIDTH 320`, `PLANE_GAP 100`, `TOTAL_PLANES 10`,
`STEP = 420`, `SPAN = 4200`.

The row wraps at `±SPAN/2`. That jump is invisible **only** while the plane is already
past the camera, i.e. `|z| > perspective`, where `z = centered × -1.2` and
`perspective: 2000px` (`index.css`). So:

```
SPAN/2 × 1.2 > 2000     →     SPAN > 3334
```

Currently `SPAN/2 × 1.2 = 2520`, a 433px hidden zone, with ~8 planes on screen.
**If you change `TOTAL_PLANES`, you must re-check this.** The reference's `-80`
overlap works at its 26 planes (`SPAN 6240`) but at 10 planes gives `z = 1440` — every
plane would visibly pop. That is why the gap here is `+100` (separated panels) rather
than the reference's `-80` (overlapping ribbon).

Three places must agree, enforced by nothing but comments:

1. `PLANE_WIDTH = 320` in `Planes.jsx` ↔ `.plane { width: 320px }` in `index.css`.
2. `perspective: 2000px` in CSS ↔ the invariant above, which lives in JS.
3. `.planes-track { height: calc(100svh + 2800px) }` ↔ `SPAN`, at ~1.5 carousel-pixels
   per scroll-pixel. Change `SPAN` and this should move with it or the pace shifts.

Worth fixing properly one day: drive the CSS from the JS constants via custom
properties and assert the invariant.

### Footer reveal — the maths is self-consistent, don't "fix" it

`revealAt = footerHeight / viewportHeight`, and with `offset: ['end end', 'end start']`
the maximum achievable `scrollYProgress` is *exactly* that same ratio (you can only
scroll `footerHeight` past the content's end). That is why the reveal lands precisely
at 1.0 at the page bottom. It looks like a coincidence; it isn't.

Also required: `.content` must keep an **opaque background**, or the footer shows
through before it is uncovered. It sits at `z-index: 1` over the footer's `z-index: -1`,
inside `.page` which has `isolation: isolate`.

### Ticker loop

Offsets are `scrollY × [0.5, -0.7, 0.6, -0.8]` (reference values). Wrapping is by **one
solid/outline pair width**, because the row is periodic at that interval — that is why
the seam never shows. Copies rendered = `ceil(viewportWidth / pairWidth) + 2`.

### Type traps

- **League Gothic has no italic.** The hero's `<em>` is restyled, never italicised.
- `background-clip: text` requires `color: transparent`, so a dropped gradient would
  make the hero title *invisible*. There is an `@supports` guard with flat amber as the
  base colour. Keep it.
- The wordmark is uppercased by CSS (`text-transform`), so the source is lowercase and
  split for two-tone: `vzl<span>mr</span>`. Same for `.footer-wordmark`.
- Splitting a word into per-letter spans measured **identical** width here (310.08px
  either way) — League Gothic carries no kerning pairs for S/T/I/L/L.
- Specificity trap already fixed once: `.about-body p` beat `.eyebrow`, shrinking the
  kicker. It is scoped `p:not(.eyebrow)` — keep it that way.

---

## 4. Architecture

```
App.jsx          owns viewer state + contentRef (the footer watches it)
  Header         fixed; adds .is-stuck on scroll; carries a scrim so the nav
                 stays legible over a bright hero photo
  main.content   ← opaque lid; the footer is revealed from under this
    Hero         centred title screen, radial vignette pooled under the words
    Planes       3D velocity carousel (see §3)
    Gallery      filterable masonry; the accessible route to every photo
    TextLines    four scroll-linked tickers
    About        single centred column
    Contact      single centred column
  Footer         sticky under-page reveal on a blueberry oklch field
  Lightbox       full-screen viewer, mounted only when open
```

Photo clicks flow `onOpen(items, index)` → `viewer` state → `Lightbox`. `items` is
whatever list the click came from, so lightbox arrows walk the set the visitor is
looking at (the gallery passes its *filtered* list deliberately).

`Lightbox.jsx` is the most complete component: focus trap, focus restore, Escape,
arrows, touch swipe, neighbour preloading, `aria-modal` with a positional label.
It needed no changes across this whole build — leave it alone.

Hooks: `useReveal` (one-shot IntersectionObserver fade-in; opt in with
`className="reveal"`, respects reduced-motion), `useMediaQuery` (live `matchMedia`;
**returns `false` on first render**, so mobile briefly mounts the 3D tree before
swapping to the static strip).

---

## 5. Verifying scroll-driven work — the hard-won part

Headless Chrome is the only automation available here (`/Applications/Google Chrome.app`).
It has sharp edges that cost real time to discover:

- **Screenshots of *scrolled* pages come back blank.** A uniform `#0d1111` image
  (~5854 bytes at 1440×900) means the capture, not your code. Never conclude "the
  section is empty" from a scrolled screenshot.
- **To photograph a section, don't scroll — hide what precedes it.** Inject
  `<style>.hero, .planes { display: none !important }</style>` plus
  `.reveal { opacity: 1 !important }` and shoot the unscrolled page.
- **To check scrolled state, use `--dump-dom`, not screenshots.** It handles scrolling
  fine. Have the page write values into a `<pre id="probe">` and parse it out.
- **Never use `setTimeout` in a probe.** Timers starve `--virtual-time-budget`; the
  budget expires before React paints and you get a blank. Poll with `requestAnimationFrame`.
- **Springs and `useVelocity` need a real clock.** Under `--virtual-time-budget` they
  never integrate, so planes read as unmoved. Fix: serve a resource that `time.sleep(5)`s,
  reference it as a hidden `<img>`, and the `load` event holds open for real wall-clock
  seconds — then `--dump-dom`.
- **`html { scroll-behavior: smooth }` swallows programmatic `scrollTo`.** Set
  `document.documentElement.style.scrollBehavior = 'auto'` first.
- **picsum is slow and flaky in headless**, and `.plane` has no background of its own,
  so unloaded images look exactly like a layout bug. For deterministic shots, patch the
  built bundle's `https://picsum.photos` → a local server that returns generated SVGs.

Verified this way and worth not re-deriving: plane transforms match
`y = centered × -0.35` / `z = centered × -1.2` exactly; all four tickers match
`wrap(-pairWidth, 0, scrollY × speed)` to three decimals; the footer reveal scrubs
opacity 0→1, scale 0.9→1, blur 6px→0 and reaches 1.0 at the page bottom.

---

## 6. User's stated preferences

Decisions the user made explicitly. Don't quietly reverse them.

- **Simple and minimalist**, and **everything centred** — hero, section heads, About,
  Contact, footer columns. They chose this over the references' left-aligned layout.
- Likes the motion.dev house style; asked for it specifically over earlier work.
- **Disliked the neon pink→cyan spectrum** on the hero title. Wanted the album palette.
- Asked for a **smooth gradient**, having found flat per-letter blocks "too cranky".
- Wanted the surf capped at **10 images** because the scroll was too long.
- The 3D planes **replaced** an earlier flat horizontal card reel; both `Reel.jsx` and
  `useHorizontalReel.js` were deleted. Don't resurrect them.

Comment style in this repo: explain **why**, not what — especially the non-obvious
constraint behind a number. Match that.

---

## 7. Known gaps (agreed, not yet done)

Roughly in priority order:

1. **Placeholder content** (§1) — the biggest gap by far.
2. **Image delivery.** No `srcset`/`sizes` anywhere. Plane images have no `loading`
   attribute, so all ten fetch eagerly below the fold, and no `width`/`height`. Gallery
   tiles *do* lazy-load. With real photos this is the difference between a fast page and
   a very heavy one.
3. **Reduced-motion is only half-covered.** `Planes` respects it; the tickers and the
   footer reveal do not. The blanket `@media (prefers-reduced-motion: reduce)` rule
   cannot help — it zeroes animation/transition durations, and this motion is neither.
4. **No tests.** The scroll geometry is the thing worth pinning, especially the §3
   wrap invariant.
5. **No `og:image` or canonical**, so shared links have no preview.
6. Bundle is 344KB / 110KB gzip, mostly Motion. Secondary to (2).
7. Open design question: the page is ~10,400px and the surf, the grid and the text band
   all say "here are the categories". Cutting one is the user's call.
