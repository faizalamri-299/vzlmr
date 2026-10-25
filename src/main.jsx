import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Vite links the stylesheet after this module, and WebKit (Safari, and every
// in-app browser on iPhone, Instagram's included) can run the module before the
// sheet applies, even while `link.sheet` already reports it. The hero's Flip
// zoom and the scroll scenes measure the page once at mount, so an unstyled
// mount bakes in a broken layout. So mount once the stylesheet's own tokens
// resolve on :root (late web fonts only reflow, which ScrollTrigger already
// re-measures for), and give up waiting after ten seconds.
const styled = () => getComputedStyle(document.documentElement).getPropertyValue('--bone') !== ''

new Promise((done) => {
  const start = Date.now()
  const check = () => (styled() || Date.now() - start > 10000 ? done() : setTimeout(check, 30))
  check()
}).then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
