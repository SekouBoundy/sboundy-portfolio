/* src/pages/About.js */
// ═══════════════════════════════════════
//  Skills — terminal window
// ═══════════════════════════════════════

import { closeWindow, minimizeWindow, maximizeWindow, makeDraggable, focusWindow } from '../utils/windowManager.js'

const TERM_LINES = [
  { type: 'cmd',  text: 'sboundy skills --list' },
  { type: 'gap' },
  { type: 'sec',  text: '[ DEVELOPMENT ]' },
  { type: 'out',  text: '  ✓ React              → Web apps & SPAs',          color: 'green'  },
  { type: 'out',  text: '  ✓ Flutter            → Cross-platform mobile',     color: 'green'  },
  { type: 'out',  text: '  ✓ React Native       → iOS & Android',             color: 'green'  },
  { type: 'out',  text: '  ✓ HTML / CSS / JS    → Web fundamentals',          color: 'green'  },
  { type: 'gap' },
  { type: 'sec',  text: '[ DESIGN & UI ]' },
  { type: 'out',  text: '  ✓ Figma              → UI/UX & Prototyping',       color: 'yellow' },
  { type: 'out',  text: '  ✓ Web Mockups        → Full design systems',       color: 'yellow' },
  { type: 'out',  text: '  ✓ Mobile Design      → iOS & Android UX',          color: 'yellow' },
  { type: 'gap' },
  { type: 'sec',  text: '[ CREATIVE ]' },
  { type: 'out',  text: '  ✓ Hand Drawing       → Illustration & art',        color: 'green'  },
  { type: 'out',  text: '  ✓ Graphic Design     → Flyers & visual identity',  color: 'green'  },
  { type: 'gap' },
  { type: 'cmd',  text: 'sboundy --status' },
  { type: 'out',  text: '  Student | Open to work | Mali | FR · EN',          color: 'green'  },
  { type: 'cursor' },
]

let termDone = false

export function runTerminal() {
  if (termDone) return
  termDone = true

  const body = document.getElementById('term-body')
  if (!body) return

  body.innerHTML = ''
  let i = 0

  function next() {
    if (i >= TERM_LINES.length) return
    const line = TERM_LINES[i++]
    const delay = line.delay || 55

    setTimeout(() => {
      const el = document.createElement('div')

      switch (line.type) {
        case 'cmd':
          el.className = 'term-line'
          el.innerHTML = `
            <span class="term-prompt">sboundy@portfolio ~ %</span>
            <span class="term-cmd"> ${line.text}</span>
          `
          break

        case 'sec':
          el.className = 'term-out term-out--violet term-out--bold'
          el.textContent = line.text
          break

        case 'out':
          el.className = `term-out term-out--${line.color || 'default'}`
          el.textContent = line.text
          break

        case 'gap':
          el.innerHTML = '&nbsp;'
          break

        case 'cursor':
          el.className = 'term-line'
          el.innerHTML = `
            <span class="term-prompt">sboundy@portfolio ~ %</span>
            <span class="term-cursor"></span>
          `
          break
      }

      body.appendChild(el)
      body.scrollTop = body.scrollHeight
      next()
    }, delay)
  }

  next()
}

export class Skills {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const win = document.createElement('div')
    win.className = 'win'
    win.id = 'win-terminal'

    win.innerHTML = `
      <!-- Chrome -->
      <div class="win-chrome win-chrome--dark" id="chrome-terminal">
        <div class="traffic-lights">
          <div class="tl tl--close" data-action="close" data-win="terminal"></div>
          <div class="tl tl--min"   data-action="min"   data-win="terminal"></div>
          <div class="tl tl--max"   data-action="max"   data-win="terminal"></div>
        </div>
        <div class="win-title term-win-title">sboundy@portfolio — skills -zsh</div>
        <div style="width:52px"></div>
      </div>

      <!-- Terminal body -->
      <div class="term-body" id="term-body"></div>
    `

    document.getElementById('macos').appendChild(win)
  }

  bindEvents() {
    const win = document.getElementById('win-terminal')

    win.querySelectorAll('.tl').forEach(tl => {
      tl.addEventListener('click', e => {
        const action = e.target.dataset.action
        if (action === 'close') closeWindow('terminal')
        if (action === 'min')   minimizeWindow('terminal')
        if (action === 'max')   maximizeWindow('terminal')
      })
    })

    win.addEventListener('mousedown', () => focusWindow('terminal'))

    makeDraggable(
      document.getElementById('chrome-terminal'),
      win,
      'terminal'
    )
  }
}