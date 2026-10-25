import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Registered once here so every component imports a ready gsap instead of
// each one racing to register the same plugins.
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText)

// Phones change height as the address bar slides away; re-measuring every
// scroll animation mid-scroll for that stutters, and nothing here needs it.
ScrollTrigger.config({ ignoreMobileResize: true })

// League Gothic can land after `load`, and the display type resizes every
// section when it does; ScrollTrigger only re-measures on load and resize.
document.fonts?.ready.then(() => ScrollTrigger.refresh())

export { gsap, Flip, ScrollTrigger, SplitText, useGSAP }
