/* src/pages/Blog.js */
// ═══════════════════════════════════════
//  Blog — notes style window
// ═══════════════════════════════════════

import { closeWindow, minimizeWindow, maximizeWindow, makeDraggable, focusWindow } from '../utils/windowManager.js'
import { lang } from '../main.js'

export class Blog {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const win = document.createElement('div')
    win.className = 'win'
    win.id = 'win-blog'

    const items = lang.get('blog.items') || []

    win.innerHTML = `
      <!-- Chrome -->
      <div class="win-chrome" id="chrome-blog">
        <div class="traffic-lights">
          <div class="tl tl--close" data-action="close" data-win="blog"></div>
          <div class="tl tl--min"   data-action="min"   data-win="blog"></div>
          <div class="tl tl--max"   data-action="max"   data-win="blog"></div>
        </div>
        <div class="win-title">Notes — Blog</div>
        <div style="width:52px"></div>
      </div>

      <!-- Body -->
      <div class="win-body">

        <!-- Notes list -->
        <div class="notes-list">
          ${items.map((item, i) => `
            <div class="note-item ${i === 0 ? 'active' : ''}" data-index="${i}">
              <div class="note-item__cat">${item.cat}</div>
              <div class="note-item__title">${item.title}</div>
              <div class="note-item__date">${item.date}</div>
            </div>
          `).join('')}
        </div>

        <!-- Note content -->
        <div class="note-content">
          <h3 class="note-content__title" id="note-title">${items[0]?.title || ''}</h3>
          <p class="note-content__body" data-i18n="blog.body">
            SBOUNDY will be sharing tutorials on Flutter, Figma, React and more. Stay tuned.
          </p>
          <span class="note-coming-badge" data-i18n="blog.soon">Coming soon</span>
        </div>

      </div>
    `

    document.getElementById('macos').appendChild(win)
  }

  bindEvents() {
    const win = document.getElementById('win-blog')

    // Traffic lights
    win.querySelectorAll('.tl').forEach(tl => {
      tl.addEventListener('click', e => {
        const action = e.target.dataset.action
        if (action === 'close') closeWindow('blog')
        if (action === 'min')   minimizeWindow('blog')
        if (action === 'max')   maximizeWindow('blog')
      })
    })

    // Note selection
    win.querySelectorAll('.note-item').forEach(item => {
      item.addEventListener('click', () => {
        win.querySelectorAll('.note-item').forEach(n => n.classList.remove('active'))
        item.classList.add('active')
        const title = item.querySelector('.note-item__title').textContent
        document.getElementById('note-title').textContent = title
      })
    })

    win.addEventListener('mousedown', () => focusWindow('blog'))

    makeDraggable(
      document.getElementById('chrome-blog'),
      win,
      'blog'
    )
  }
}