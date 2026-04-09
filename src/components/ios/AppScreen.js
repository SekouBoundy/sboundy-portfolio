/* src/components/ios/AppScreen.js */
// ═══════════════════════════════════════
//  iOS AppScreen — full screen wrapper
// ═══════════════════════════════════════

import { lang, clock } from '../../main.js'

export class AppScreen {
  constructor({ id, title, i18nKey, content }) {
    this.id = id
    this.title = title
    this.i18nKey = i18nKey
    this.content = content
    this.render()
  }

  render() {
    const el = document.createElement('div')
    el.className = 'ios-screen'
    el.id = `app-${this.id}`

    el.innerHTML = `
      <!-- Status bar -->
      <div class="ios-screen-bar">
        <div class="ios-time" data-type="time-only">9:41</div>
        <div class="ios-status-icons">
          <span>100%</span>
        </div>
      </div>

      <!-- Navbar -->
      <div class="ios-navbar">
        <div class="ios-back" data-close="${this.id}">‹ Home</div>
        <div class="ios-navbar__title" ${this.i18nKey ? `data-i18n="${this.i18nKey}"` : ''}>
          ${this.title}
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="ios-scroll" id="ios-scroll-${this.id}">
        ${this.content}
      </div>

      <div class="home-indicator"></div>
    `

    document.getElementById('ios').appendChild(el)

    // Register clock
    clock.elements.push(...el.querySelectorAll('[data-type="time-only"]'))
  }

  open() {
    document.getElementById(`app-${this.id}`).classList.add('open')
  }

  close() {
    document.getElementById(`app-${this.id}`).classList.remove('open')
  }
}