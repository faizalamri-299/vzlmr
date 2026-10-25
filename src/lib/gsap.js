import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registered once here so every component imports a ready gsap instead of
// each one racing to register the same plugins.
gsap.registerPlugin(useGSAP, ScrollTrigger)

// League Gothic can land after `load`, and the display type resizes every
// section when it does; ScrollTrigger only re-measures on load and resize.
document.fonts?.ready.then(() => ScrollTrigger.refresh())

export { gsap, ScrollTrigger, useGSAP }
