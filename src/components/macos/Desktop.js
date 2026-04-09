/* src/components/macos/Desktop.js */
// ═══════════════════════════════════════
//  Desktop — wallpaper + desktop icons
// ═══════════════════════════════════════

import { openWindow } from '../../utils/windowManager.js'

export class Desktop {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const el = document.createElement('div')
    el.className = 'desktop-icons'
    el.innerHTML = `
      <div class="desk-icon" data-window="about">
        <div class="desk-icon__img">🗂️</div>
        <div class="desk-icon__name" data-i18n="nav.about">About Me</div>
      </div>
      <div class="desk-icon" data-window="projects">
        <div class="desk-icon__img">📁</div>
        <div class="desk-icon__name" data-i18n="nav.projects">Projects</div>
      </div>
    `
    document.getElementById('macos').appendChild(el)
  }

  bindEvents() {
    document.querySelectorAll('.desk-icon').forEach(icon => {
      icon.addEventListener('dblclick', () => {
        openWindow(icon.dataset.window)
      })
    })
  }
}