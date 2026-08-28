import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from the custom domain https://vzlmr.com/ — i.e. the domain root, so
  // asset URLs must NOT be prefixed with the repo name. This was '/vzlmr/' while
  // the site lived at faizalamri-299.github.io/vzlmr/; if the custom domain ever
  // goes away, it has to go back, or every /assets/... request 404s and the page
  // renders blank.
  base: '/',
  plugins: [react()],
})
