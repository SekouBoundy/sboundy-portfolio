/* src/pages/About.js */
// ═══════════════════════════════════════
//  Projects — window content
// ═══════════════════════════════════════

import { closeWindow, minimizeWindow, maximizeWindow, makeDraggable, focusWindow } from '../utils/windowManager.js'
import { lang } from '../main.js'

export class Projects {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const win = document.createElement('div')
    win.className = 'win'
    win.id = 'win-projects'

    win.innerHTML = `
      <!-- Chrome -->
      <div class="win-chrome" id="chrome-projects">
        <div class="traffic-lights">
          <div class="tl tl--close" data-action="close" data-win="projects"></div>
          <div class="tl tl--min"   data-action="min"   data-win="projects"></div>
          <div class="tl tl--max"   data-action="max"   data-win="projects"></div>
        </div>
        <div class="win-title" data-i18n="projects.title">Projects — SBOUNDY</div>
        <div style="width:52px"></div>
      </div>

      <!-- Body -->
      <div class="win-body">

        <!-- Sidebar -->
        <div class="win-sidebar">
          <div class="sidebar-section" data-i18n="nav.projects">Categories</div>
          <div class="sidebar-item active" data-filter="all">
            <span class="sidebar-icon">📱</span>
            <span>All</span>
          </div>
          <div class="sidebar-item" data-filter="dev">
            <span class="sidebar-icon">💻</span>
            <span>Dev</span>
          </div>
          <div class="sidebar-item" data-filter="design">
            <span class="sidebar-icon">🎨</span>
            <span>Design</span>
          </div>
          <div class="sidebar-item" data-filter="creative">
            <span class="sidebar-icon">✏️</span>
            <span>Creative</span>
          </div>
        </div>

        <!-- Main -->
        <div class="win-main">
          <div class="proj-grid" id="proj-grid"></div>
        </div>

      </div>
    `

    document.getElementById('macos').appendChild(win)
    this.renderProjects()
  }

  renderProjects() {
    const grid  = document.getElementById('proj-grid')
    const items = lang.get('projects.items') || []

    grid.innerHTML = items.map(item => `
      <div class="proj-card" data-id="${item.id}">
        <div class="proj-thumb" style="background: ${item.color}">
          <span class="proj-thumb__label">${item.thumb}</span>
        </div>
        <div class="proj-body">
          <div class="proj-title">${item.name}</div>
          <div class="proj-desc">${item.desc}</div>
          <div class="proj-tags">
            ${item.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('') + `
      <div class="proj-card proj-card--empty">
        <div class="proj-empty-icon">+</div>
        <div class="proj-empty-label" data-i18n="projects.more">More coming soon</div>
      </div>
    `
  }

  bindEvents() {
    const win = document.getElementById('win-projects')

    // Traffic lights
    win.querySelectorAll('.tl').forEach(tl => {
      tl.addEventListener('click', e => {
        const action = e.target.dataset.action
        if (action === 'close') closeWindow('projects')
        if (action === 'min')   minimizeWindow('projects')
        if (action === 'max')   maximizeWindow('projects')
      })
    })

    // Focus
    win.addEventListener('mousedown', () => focusWindow('projects'))

    // Drag
    makeDraggable(
      document.getElementById('chrome-projects'),
      win,
      'projects'
    )
  }
}