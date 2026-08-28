# vzlmr

**Read [SKILLS.md](SKILLS.md) before touching `src/`.** It holds the knowledge that
isn't in the code: where the design and its exact colour/type values came from, which
numbers are load-bearing (the 3D planes have a wrap invariant that breaks silently),
how to verify scroll-driven work in headless Chrome without hitting its traps, the
user's stated design decisions, and the agreed list of known gaps.

Photography portfolio: React 19 + Vite 8, `motion` 13, one stylesheet (`src/index.css`).

```
npm run dev      # dev server
npx oxlint       # lint
npx vite build   # build
```

There is no test runner. `oxlint` and a clean `vite build` are the checks.
