/* src/pages/Contact.js */
// ═══════════════════════════════════════
//  Contact — mail style window
// ═══════════════════════════════════════

import { closeWindow, minimizeWindow, maximizeWindow, makeDraggable, focusWindow } from '../utils/windowManager.js'
import { lang } from '../main.js'

export class Contact {
  constructor() {
    this.render()
    this.bindEvents()
  }

  render() {
    const win = document.createElement('div')
    win.className = 'win'
    win.id = 'win-contact'

    const links = lang.get('contact.links') || []

    win.innerHTML = `
      <!-- Chrome -->
      <div class="win-chrome" id="chrome-contact">
        <div class="traffic-lights">
          <div class="tl tl--close" data-action="close" data-win="contact"></div>
          <div class="tl tl--min"   data-action="min"   data-win="contact"></div>
          <div class="tl tl--max"   data-action="max"   data-win="contact"></div>
        </div>
        <div class="win-title">Mail — Contact SBOUNDY</div>
        <div style="width:52px"></div>
      </div>

      <!-- Body -->
      <div class="win-body">

        <!-- Mail sidebar -->
        <div class="win-sidebar">
          <div class="sidebar-section">Mailboxes</div>
          <div class="sidebar-item active">
            <span class="sidebar-icon">📥</span>
            <span data-i18n="contact.inbox">Inbox</span>
          </div>
          <div class="sidebar-item">
            <span class="sidebar-icon">⭐</span>
            <span>Starred</span>
          </div>
          <div class="sidebar-item">
            <span class="sidebar-icon">📤</span>
            <span>Sent</span>
          </div>
          <div class="sidebar-item">
            <span class="sidebar-icon">📝</span>
            <span>Drafts</span>
          </div>
        </div>

        <!-- Contact content -->
        <div class="win-main">
          <div class="contact-content">
            <h2 class="contact-title">
              <em data-i18n="contact.title">Let's talk.</em>
            </h2>
            <p class="contact-sub" data-i18n="contact.subtitle">
              Have a project? Want to collaborate? Or just say hi.
            </p>
            <div class="contact-links" id="contact-links">
              ${links.map(l => `
                <div class="contact-btn">
                  <span class="contact-btn__icon">${l.icon}</span>
                  <span class="contact-btn__label">${l.label}</span>
                  <span class="contact-btn__arrow">›</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `

    document.getElementById('macos').appendChild(win)
  }

  bindEvents() {
    const win = document.getElementById('win-contact')

    win.querySelectorAll('.tl').forEach(tl => {
      tl.addEventListener('click', e => {
        const action = e.target.dataset.action
        if (action === 'close') closeWindow('contact')
        if (action === 'min')   minimizeWindow('contact')
        if (action === 'max')   maximizeWindow('contact')
      })
    })

    win.addEventListener('mousedown', () => focusWindow('contact'))

    makeDraggable(
      document.getElementById('chrome-contact'),
      win,
      'contact'
    )
  }
}