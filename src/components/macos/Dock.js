/* src/components/macos/Dock.js */
// ═══════════════════════════════════════
//  Dock — macOS bottom dock
// ═══════════════════════════════════════

import { openWindow } from '../../utils/windowManager.js'

const DOCK_ITEMS = [
  { id: 'about',    icon: 'di-finder',  emoji: '🗂️', label: 'About Me',  dot: true  },
  { id: 'terminal', icon: 'di-term',    text:  '$_',  label: 'Skills',   dot: true  },
  { id: 'projects', icon: 'di-photos',  emoji: '📁', label: 'Projects',  dot: true  },
  { id: 'blog',     icon: 'di-notes',   emoji: '📝', label: 'Blog',      dot: true  },
  { id: 'contact',  icon: 'di-mail',    emoji: '✉️', label: 'Contact',   dot: true  },
  { id: 'figma',    icon: 'di-figma',   text:  'Fg',  label: 'Figma',    dot: true  },
  { id: null,       separator: true                                                   },
  { id: null,       icon: 'di-github',  emoji: '🐙', label: 'GitHub',    dot: false },
  { id: null,       icon: 'di-trash',   emoji: '🗑️', label: 'Trash',    dot: false },
]

export class Dock {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const dock = document.createElement('div')
    dock.id = 'dock'

    dock.innerHTML = DOCK_ITEMS.map(item => {
      if (item.separator) {
        return `<div class="dock-separator"></div>`
      }

      const inner = item.emoji
        ? item.emoji
        : `<span style="font-family:var(--font-mono);font-weight:700;font-size:1rem;color:inherit">${item.text}</span>`

      return `
        <div class="dock-item" ${item.id ? `data-window="${item.id}"` : ''}>
          <div class="dock-icon ${item.icon}">${inner}</div>
          <div class="dock-dot ${item.dot ? '' : 'dock-dot--hidden'}"></div>
          <div class="dock-label">${item.label}</div>
        </div>
      `
    }).join('')

    document.getElementById('macos').appendChild(dock)
  }

  bindEvents() {
    document.querySelectorAll('.dock-item[data-window]').forEach(item => {
      item.addEventListener('click', () => openWindow(item.dataset.window))
    })
  }
}