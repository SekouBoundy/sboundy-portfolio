/* src/pages/About.js */
// ═══════════════════════════════════════
//  About — window content
// ═══════════════════════════════════════

import { closeWindow, minimizeWindow, maximizeWindow, makeDraggable, focusWindow } from '../utils/windowManager.js'
import { lang } from '../main.js'

export class About {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const win = document.createElement('div')
    win.className = 'win'
    win.id = 'win-about'

    win.innerHTML = `
      <!-- Chrome -->
      <div class="win-chrome" id="chrome-about">
        <div class="traffic-lights">
          <div class="tl tl--close" data-action="close"  data-win="about"></div>
          <div class="tl tl--min"   data-action="min"    data-win="about"></div>
          <div class="tl tl--max"   data-action="max"    data-win="about"></div>
        </div>
        <div class="win-title" data-i18n="nav.about">About Me</div>
        <div style="width:52px"></div>
      </div>

      <!-- Body -->
      <div class="win-body">

        <!-- Sidebar -->
        <div class="win-sidebar">
          <div class="sidebar-section">Favorites</div>
          <div class="sidebar-item active" data-tab="main">
            <span class="sidebar-icon">👤</span>
            <span data-i18n="about.tabs.profile">Profile</span>
          </div>
          <div class="sidebar-item" data-tab="stack">
            <span class="sidebar-icon">⚡</span>
            <span data-i18n="about.tabs.stack">Tech Stack</span>
          </div>
          <div class="sidebar-section">Locations</div>
          <div class="sidebar-item" data-tab="journey">
            <span class="sidebar-icon">🗺️</span>
            <span data-i18n="about.tabs.journey">Journey</span>
          </div>
        </div>

        <!-- Main content -->
        <div class="win-main">

          <!-- Profile tab -->
          <div class="content-panel active" id="about-main">
            <div class="about-hero">
              <div class="about-photo">
                <img src="/images/sboundy.png" alt="SBOUNDY">
              </div>
              <div class="about-info">
                <h2 class="about-name">SBOUNDY</h2>
                <div class="about-badge">
                  <div class="about-badge__dot"></div>
                  <span data-i18n="about.status">Student · Open to work</span>
                </div>
                <p data-i18n="about.bio">
                  I'm SBOUNDY — a student who builds, designs, and creates.
                </p>
              </div>
            </div>

            <div class="about-stats">
              <div class="astat">
                <div class="astat__num">3+</div>
                <div class="astat__label" data-i18n="about.stats.exp">Yrs Exp</div>
              </div>
              <div class="astat">
                <div class="astat__num">2</div>
                <div class="astat__label">FR · EN</div>
              </div>
              <div class="astat">
                <div class="astat__num">∞</div>
                <div class="astat__label" data-i18n="about.stats.ideas">Ideas</div>
              </div>
              <div class="astat">
                <div class="astat__num astat__num--sm">MALI</div>
                <div class="astat__label" data-i18n="about.stats.base">Based</div>
              </div>
            </div>
          </div>

          <!-- Stack tab -->
          <div class="content-panel" id="about-stack">
            <div class="stack-group">
              <div class="stack-label" data-i18n="nav.skills">Development</div>
              <div class="tag-row">
                <span class="tag">React</span>
                <span class="tag">Flutter</span>
                <span class="tag">React Native</span>
                <span class="tag">HTML</span>
                <span class="tag">CSS</span>
                <span class="tag">JavaScript</span>
              </div>
            </div>
            <div class="stack-group">
              <div class="stack-label">Design & UI</div>
              <div class="tag-row">
                <span class="tag">Figma</span>
                <span class="tag">UI/UX</span>
                <span class="tag">Mockups</span>
                <span class="tag">Prototyping</span>
              </div>
            </div>
            <div class="stack-group">
              <div class="stack-label" data-i18n="about.tabs.journey">Creative</div>
              <div class="tag-row">
                <span class="tag">Illustration</span>
                <span class="tag">Hand Drawing</span>
                <span class="tag">Flyers</span>
                <span class="tag">Graphic Design</span>
              </div>
            </div>
          </div>

          <!-- Journey tab -->
          <div class="content-panel" id="about-journey">
            <div class="journey-list" id="journey-list"></div>
          </div>

        </div>
      </div>
    `

    document.getElementById('macos').appendChild(win)
    this.renderJourney()
  }

  renderJourney() {
    const list = document.getElementById('journey-list')
    const items = lang.get('about.journey') || []

    list.innerHTML = items.map(item => `
      <div class="journey-item">
        <div class="journey-date">${item.date}</div>
        <div class="journey-body">
          <div class="journey-role">${item.role}</div>
          <div class="journey-desc">${item.desc}</div>
        </div>
      </div>
    `).join('')
  }

  bindEvents() {
    const win = document.getElementById('win-about')

    // Traffic lights
    win.querySelectorAll('.tl').forEach(tl => {
      tl.addEventListener('click', e => {
        const action = e.target.dataset.action
        if (action === 'close')  closeWindow('about')
        if (action === 'min')    minimizeWindow('about')
        if (action === 'max')    maximizeWindow('about')
      })
    })

    // Sidebar tabs
    win.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab

        // Active sidebar item
        win.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'))
        item.classList.add('active')

        // Show panel
        win.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'))
        document.getElementById(`about-${tab}`).classList.add('active')

        // Re-render journey when switching to it
        if (tab === 'journey') this.renderJourney()
      })
    })

    // Focus on click
    win.addEventListener('mousedown', () => focusWindow('about'))

    // Drag
    makeDraggable(
      document.getElementById('chrome-about'),
      win,
      'about'
    )
  }
}