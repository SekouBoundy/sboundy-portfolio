import { writable } from 'svelte/store'

// Language — 'en' | 'fr'
export const currentLang = writable('en')

// Windows state — which windows are open/minimized/focused
export const windows = writable({
  about:    { open: false, minimized: false, z: 1 },
  skills:   { open: false, minimized: false, z: 1 },
  projects: { open: false, minimized: false, z: 1 },
  blog:     { open: false, minimized: false, z: 1 },
  contact:  { open: false, minimized: false, z: 1 },
})

// Top z-index tracker
export const topZ = writable(10)

// Device
export const isMobile = writable(window.innerWidth <= 768)