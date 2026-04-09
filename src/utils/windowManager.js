/* src/utils/windowManager.js */
// ═══════════════════════════════════════
//  Window Manager — open / close / drag
// ═══════════════════════════════════════

let zTop = 200

const SIZES = {
  about:    { w: 800, h: 560 },
  terminal: { w: 680, h: 460 },
  projects: { w: 840, h: 530 },
  blog:     { w: 660, h: 460 },
  contact:  { w: 700, h: 480 },
  figma:    { w: 780, h: 500 },
}

const POSITIONS = {
  about:    { top: 80,  left: 100 },
  terminal: { top: 120, left: 240 },
  projects: { top: 100, left: 70  },
  blog:     { top: 90,  left: 160 },
  contact:  { top: 100, left: 180 },
  figma:    { top: 85,  left: 80  },
}

const maximized = {}

export function openWindow(id) {
  const win = document.getElementById(`win-${id}`)
  if (!win) return

  const s = SIZES[id]     || { w: 700, h: 480 }
  const p = POSITIONS[id] || { top: 100, left: 100 }

  if (!win.style.width) {
    win.style.width  = s.w + 'px'
    win.style.height = s.h + 'px'
  }

  win.style.top  = p.top  + 'px'
  win.style.left = p.left + 'px'
  win.style.animation = 'winOpen .2s ease forwards'
  win.classList.add('open')

  focusWindow(id)

  // Run terminal animation if skills window
  if (id === 'terminal') {
    import('../pages/Skills.js').then(m => m.runTerminal?.())
  }
}

export function closeWindow(id) {
  const win = document.getElementById(`win-${id}`)
  if (!win) return

  win.style.animation = 'winClose .15s ease forwards'
  setTimeout(() => {
    win.classList.remove('open')
    win.style.animation = ''
  }, 150)
}

export function minimizeWindow(id) {
  const win = document.getElementById(`win-${id}`)
  if (!win) return

  win.style.animation = 'winMinimize .25s ease forwards'
  setTimeout(() => {
    win.classList.remove('open')
    win.style.animation = ''
  }, 250)
}

export function maximizeWindow(id) {
  const win = document.getElementById(`win-${id}`)
  if (!win) return

  if (maximized[id]) {
    maximized[id] = false
    const s = SIZES[id]     || { w: 700, h: 480 }
    const p = POSITIONS[id] || { top: 100, left: 100 }
    win.style.width         = s.w + 'px'
    win.style.height        = s.h + 'px'
    win.style.top           = p.top  + 'px'
    win.style.left          = p.left + 'px'
    win.style.borderRadius  = 'var(--radius-lg)'
  } else {
    maximized[id] = true
    win.style.width        = '100vw'
    win.style.height       = `calc(100vh - var(--menubar-height))`
    win.style.top          = 'var(--menubar-height)'
    win.style.left         = '0'
    win.style.borderRadius = '0'
  }

  focusWindow(id)
}

export function focusWindow(id) {
  document.querySelectorAll('.win').forEach(w => w.classList.remove('focused'))
  const win = document.getElementById(`win-${id}`)
  if (win) {
    win.classList.add('focused')
    win.style.zIndex = ++zTop
  }
}

export function makeDraggable(chromeEl, winEl, id) {
  let dragging = false
  let ox = 0, oy = 0

  chromeEl.addEventListener('mousedown', e => {
    if (e.target.classList.contains('tl')) return
    dragging = true
    ox = e.clientX - winEl.offsetLeft
    oy = e.clientY - winEl.offsetTop
    focusWindow(id)
    e.preventDefault()
  })

  document.addEventListener('mousemove', e => {
    if (!dragging) return
    const menuH = 28
    winEl.style.left = (e.clientX - ox) + 'px'
    winEl.style.top  = Math.max(menuH, e.clientY - oy) + 'px'
  })

  document.addEventListener('mouseup', () => dragging = false)
}