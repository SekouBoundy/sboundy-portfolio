/* src/components/macos/Menubar.js */
// ═══════════════════════════════════════
//  Menubar — macOS top bar
// ═══════════════════════════════════════

import { lang, clock } from '../../main.js'

export class Menubar {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const el = document.createElement('div')
    el.id = 'menubar'
    el.innerHTML = `
      <div class="menu-left">
        <div class="menu-item">&#63743;</div>
        <div class="menu-item menu-item--brand">SBOUNDY</div>
        <div class="menu-item">File</div>
        <div class="menu-item">View</div>
        <div class="menu-item">Window</div>
        <div class="menu-item">Help</div>
      </div>
      <div class="menu-right">
        <div class="lang-pill">
          <button class="lang-btn active" data-lang="en">EN</button>
          <button class="lang-btn"        data-lang="fr">FR</button>
        </div>
        <span>&#9679; <span data-i18n="status">Student · Open to work</span></span>
        <span id="menubar-clock"></span>
      </div>
    `
    document.getElementById('macos').appendChild(el)

    // Register clock target
    clock.elements.push(document.getElementById('menubar-clock'))
  }

  bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => lang.setLang(btn.dataset.lang))
    })
  }
}