// src/stores/index.ts
import { writable } from 'svelte/store'

export type Theme = 'dark' | 'light'
export type Lang   = 'en'  | 'fr'

export const currentLang  = writable<Lang>('en')
export const currentTheme = writable<Theme>('dark')

export const windows = writable({
  about:    { open: false, minimized: false, z: 1 },
  skills:   { open: false, minimized: false, z: 1 },
  projects: { open: false, minimized: false, z: 1 },
  blog:     { open: false, minimized: false, z: 1 },
  contact:  { open: false, minimized: false, z: 1 },
})

export const topZ     = writable(10)
export const isMobile = writable(window.innerWidth <= 768)