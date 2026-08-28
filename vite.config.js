import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from https://faizalamri-299.github.io/vzlmr/, so every
  // asset URL has to be prefixed with the repo name. Without this the built
  // index.html asks for /assets/... at the domain root and gets a 404 — blank page.
  base: '/vzlmr/',
  plugins: [react()],
})
