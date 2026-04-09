/* src/components/ios/HomeScreen.js */
// ═══════════════════════════════════════
//  iOS HomeScreen
// ═══════════════════════════════════════

import { lang } from '../../main.js'

const APPS = [
  { id: 'about',    emoji: '👤', style: 'background:linear-gradient(145deg,#4facfe,#00f2fe)',              label: 'About'    },
  { id: 'skills',   text:  '$_', style: 'background:linear-gradient(145deg,#1a1a1a,#2d2d2d);border:.5px solid #444;color:#28C840;font-family:monospace;font-weight:700;font-size:1.1rem', label: 'Skills' },
  { id: 'projects', emoji: '📁', style: 'background:linear-gradient(145deg,#f093fb,#f5576c)',              label: 'Projects' },
  { id: 'blog',     emoji: '📝', style: 'background:linear-gradient(145deg,#f9ca24,#f0932b)',              label: 'Blog'     },
  { id: 'contact',  emoji: '✉️', style: 'background:linear-gradient(145deg,#4776e6,#8e54e9)',              label: 'Contact'  },
  { id: 'figma',    text:  'Fg', style: 'background:linear-gradient(145deg,#1a1a2e,#8B5CF6);color:#fff;font-weight:700;font-size:1rem', label: 'Figma' },
  { id: 'github',   emoji: '🐙', style: 'background:linear-gradient(145deg,#1a1a1a,#333);border:.5px solid #555', label: 'GitHub' },
  { id: 'lang',     emoji: '🌐', style: 'background:linear-gradient(145deg,#232526,#414345)',              label: 'EN → FR'  },
]

const DOCK_APPS = [
  { id: 'about',   style: 'background:linear-gradient(145deg,#4facfe,#00f2fe)', emoji: '👤' },
  { id: 'projects',style: 'background:linear-gradient(145deg,#f093fb,#f5576c)', emoji: '📁' },
  { id: 'contact', style: 'background:linear-gradient(145deg,#4776e6,#8e54e9)', emoji: '✉️' },
  { id: 'blog',    style: 'background:linear-gradient(145deg,#f9ca24,#f0932b)', emoji: '📝' },
]

export class HomeScreen {
  constructor(onOpenApp) {
    this.onOpenApp = onOpenApp
    this.render()
    this.bindEvents()
  }

  render() {
    const ios = document.getElementById('ios')

    // Dynamic Island
    ios.insertAdjacentHTML('beforeend', `
      <div id="dynamic-island">
        <div class="di-cam"></div>
        <div class="di-mic"></div>
      </div>
    `)

    // Status bar
    ios.insertAdjacentHTML('beforeend', `
      <div id="ios-statusbar">
        <div class="ios-time" id="ios-clock" data-type="time-only">9:41</div>
        <div class="ios-status-icons">
          <span>●●●</span>
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </div>
    `)

    // Home screen
    ios.insertAdjacentHTML('beforeend', `
      <div id="ios-home">

        <!-- Widget -->
        <div class="ios-widget">
          <div class="ios-widget__photo">
            <img src="/images/sboundy.png" alt="SBOUNDY">
          </div>
          <div>
            <div class="ios-widget__name">SBO<em>U</em>NDY</div>
            <div class="ios-widget__sub" data-i18n="hero.label">Developer · Designer · Creative</div>
            <div class="ios-widget__badge">
              <div class="ios-badge-dot"></div>
              <span data-i18n="status">Open to work</span>
            </div>
          </div>
        </div>

        <!-- App Grid -->
        <div class="ios-apps">
          ${APPS.map(app => `
            <div class="ios-app" data-app="${app.id}">
              <div class="ios-app__icon" style="${app.style}">
                ${app.emoji || app.text || ''}
              </div>
              <div class="ios-app__name">${app.label}</div>
            </div>
          `).join('')}
        </div>

      </div>
    `)

    // Dock
    ios.insertAdjacentHTML('beforeend', `
      <div id="ios-dock">
        ${DOCK_APPS.map(a => `
          <div class="ios-dock__item" data-app="${a.id}" style="${a.style}">
            ${a.emoji}
          </div>
        `).join('')}
      </div>
    `)

    // Home indicator
    ios.insertAdjacentHTML('beforeend', `<div class="home-indicator"></div>`)
  }

  bindEvents() {
    // App grid taps
    document.querySelectorAll('.ios-app[data-app]').forEach(app => {
      app.addEventListener('click', () => {
        const id = app.dataset.app
        if (id === 'lang') return this.toggleLang()
        this.onOpenApp(id)
      })
    })

    // Dock taps
    document.querySelectorAll('.ios-dock__item[data-app]').forEach(item => {
      item.addEventListener('click', () => this.onOpenApp(item.dataset.app))
    })
  }

  toggleLang() {
    const current = lang.current === 'en' ? 'fr' : 'en'
    lang.setLang(current)
    const nameEl = document.querySelector('.ios-app[data-app="lang"] .ios-app__name')
    if (nameEl) nameEl.textContent = current === 'en' ? 'EN → FR' : 'FR → EN'
  }
}