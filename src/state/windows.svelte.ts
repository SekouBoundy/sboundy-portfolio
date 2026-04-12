// src/state/windows.svelte.ts
// ═══════════════════════════════════════
//  Windows — Svelte 5 reactive state
// ═══════════════════════════════════════

export type WinID = 'about' | 'skills' | 'projects' | 'blog' | 'design' | 'contact' | 'trash'

type WinState = {
  open:      boolean
  minimized: boolean
  maximized: boolean
  z:         number
  top:       number
  left:      number
  w:         number
  h:         number
  _saved:    { top: number; left: number; w: number; h: number } | null
}

const DEFAULTS: Record<WinID, { w: number; h: number; top: number; left: number }> = {
  about:    { w: 720, h: 500, top: 80,  left: 80  },
  skills:   { w: 620, h: 440, top: 100, left: 180 },
  projects: { w: 760, h: 520, top: 90,  left: 120 },
  blog:     { w: 640, h: 460, top: 110, left: 160 },
  design:   { w: 760, h: 520, top: 120, left: 200 },
  contact:  { w: 580, h: 420, top: 130, left: 220 },
  trash:    { w: 620, h: 460, top: 100, left: 160 },
}

function makeWin(id: WinID): WinState {
  const d = DEFAULTS[id]
  return {
    open:      false,
    minimized: false,
    maximized: false,
    z:         0,
    top:       d.top,
    left:      d.left,
    w:         d.w,
    h:         d.h,
    _saved:    null,
  }
}

export const wins = $state<Record<WinID, WinState>>({
  about:    makeWin('about'),
  skills:   makeWin('skills'),
  projects: makeWin('projects'),
  blog:     makeWin('blog'),
  design:   makeWin('design'),
  contact:  makeWin('contact'),
  trash:    makeWin('trash'),
})

let _zTop = 10

// ── Actions ──────────────────────────────

export function openWin(id: WinID) {
  wins[id].open      = true
  wins[id].minimized = false
  focusWin(id)
}

export function closeWin(id: WinID) {
  wins[id].open      = false
  wins[id].minimized = false
  wins[id].maximized = false
}

export function minimizeWin(id: WinID) {
  wins[id].minimized = true
  wins[id].open      = false
}

export function maximizeWin(id: WinID) {
  if (wins[id].maximized) {
    const s = wins[id]._saved
    if (s) {
      wins[id].top  = s.top
      wins[id].left = s.left
      wins[id].w    = s.w
      wins[id].h    = s.h
    }
    wins[id].maximized = false
  } else {
    wins[id]._saved = {
      top:  wins[id].top,
      left: wins[id].left,
      w:    wins[id].w,
      h:    wins[id].h,
    }
    wins[id].maximized = true
  }
  focusWin(id)
}

export function focusWin(id: WinID) {
  wins[id].z = ++_zTop
}