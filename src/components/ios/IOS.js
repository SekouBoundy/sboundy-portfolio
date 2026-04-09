/* src/components/ios/IOS.js */
// ═══════════════════════════════════════
//  iOS — orchestrates all iOS screens
// ═══════════════════════════════════════

import { HomeScreen } from './HomeScreen.js'
import { AppScreen  } from './AppScreen.js'
import { lang, clock } from '../../main.js'

export class IOS {
  constructor() {
    this.screens = {}
    this.init()
  }

  init() {
    // Home screen
    new HomeScreen(id => this.openApp(id))

    // Register clock for iOS status bar
    clock.elements.push(document.getElementById('ios-clock'))

    // Build all screens
    this.buildAbout()
    this.buildSkills()
    this.buildProjects()
    this.buildBlog()
    this.buildContact()

    // Back button listener
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-close]')
      if (btn) this.closeApp(btn.dataset.close)
    })
  }

  openApp(id) {
    const screen = this.screens[id]
    if (screen) screen.open()
  }

  closeApp(id) {
    const screen = this.screens[id]
    if (screen) screen.close()
  }

  buildAbout() {
    this.screens.about = new AppScreen({
      id: 'about',
      title: 'About Me',
      i18nKey: 'nav.about',
      content: `
        <div class="ios-profile-card">
          <div class="ios-profile-top">
            <div class="ios-profile-photo">
              <img src="/images/sboundy.png" alt="SBOUNDY">
            </div>
            <div>
              <div class="ios-profile-name">SBO<em>U</em>NDY</div>
              <div class="ios-profile-sub" data-i18n="hero.label">Developer · Designer · Creative</div>
              <div class="ios-profile-badge">
                <div class="ios-badge-dot"></div>
                <span data-i18n="about.status">Student · Open to work</span>
              </div>
            </div>
          </div>
          <div class="ios-stat-row">
            <div class="ios-stat">
              <div class="ios-stat__num">3+</div>
              <div class="ios-stat__label" data-i18n="about.stats.exp">Yrs Exp</div>
            </div>
            <div class="ios-stat">
              <div class="ios-stat__num">2</div>
              <div class="ios-stat__label">FR·EN</div>
            </div>
            <div class="ios-stat">
              <div class="ios-stat__num">∞</div>
              <div class="ios-stat__label" data-i18n="about.stats.ideas">Ideas</div>
            </div>
          </div>
        </div>

        <div class="ios-section-header">Bio</div>
        <div class="ios-list">
          <div class="ios-list-item" style="flex-direction:column;align-items:flex-start;gap:4px">
            <p style="font-size:13px;color:var(--color-secondary);line-height:1.8" data-i18n="about.bio">
              I build apps with Flutter & React Native, craft web experiences with React, design in Figma, and draw illustrations by hand.
            </p>
          </div>
        </div>

        <div class="ios-section-header" data-i18n="about.tabs.journey">Journey</div>
        <div class="ios-list">
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">💼</div>
            <div class="ios-list-label">
              <div class="ios-list-label__main" data-i18n="about.journey[0].role">Freelance Dev & Designer</div>
              <div class="ios-list-label__sub">2024 — now</div>
            </div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">📱</div>
            <div class="ios-list-label">
              <div class="ios-list-label__main">MaRevision</div>
              <div class="ios-list-label__sub">2023</div>
            </div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">🎓</div>
            <div class="ios-list-label">
              <div class="ios-list-label__main" data-i18n="about.journey[2].role">CS Student · Mali</div>
              <div class="ios-list-label__sub">2022 — now</div>
            </div>
          </div>
        </div>
      `
    })
  }

  buildSkills() {
    this.screens.skills = new AppScreen({
      id: 'skills',
      title: 'Skills',
      content: `
        <div class="ios-section-header">Development</div>
        <div class="ios-list">
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(97,218,251,.2)">⚛</div>
            <div class="ios-list-label"><div class="ios-list-label__main">React</div></div>
            <div class="ios-list-value">Web Apps</div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(84,197,248,.2)">💙</div>
            <div class="ios-list-label"><div class="ios-list-label__main">Flutter</div></div>
            <div class="ios-list-value">Mobile</div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(97,218,251,.2)">📱</div>
            <div class="ios-list-label"><div class="ios-list-label__main">React Native</div></div>
            <div class="ios-list-value">iOS & Android</div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(247,223,30,.2)">🌐</div>
            <div class="ios-list-label"><div class="ios-list-label__main">HTML · CSS · JS</div></div>
            <div class="ios-list-value">Web</div>
          </div>
        </div>

        <div class="ios-section-header">Design & UI</div>
        <div class="ios-list">
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">▲</div>
            <div class="ios-list-label"><div class="ios-list-label__main">Figma</div></div>
            <div class="ios-list-value">UI/UX</div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">🖼</div>
            <div class="ios-list-label"><div class="ios-list-label__main">Mockups</div></div>
            <div class="ios-list-value">Web & Mobile</div>
          </div>
        </div>

        <div class="ios-section-header">Creative</div>
        <div class="ios-list">
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(255,165,0,.2)">✏️</div>
            <div class="ios-list-label"><div class="ios-list-label__main">Hand Drawing</div></div>
            <div class="ios-list-value">Illustration</div>
          </div>
          <div class="ios-list-item">
            <div class="ios-list-icon" style="background:rgba(255,165,0,.2)">🎨</div>
            <div class="ios-list-label"><div class="ios-list-label__main">Graphic Design</div></div>
            <div class="ios-list-value">Flyers</div>
          </div>
        </div>
      `
    })
  }

  buildProjects() {
    const items = lang.get('projects.items') || []
    this.screens.projects = new AppScreen({
      id: 'projects',
      title: 'Projects',
      i18nKey: 'nav.projects',
      content: `
        <div class="ios-proj-list">
          ${items.map(item => `
            <div class="ios-proj-card">
              <div class="ios-proj-thumb" style="background:${item.color}">
                <span class="ios-proj-thumb__label">${item.thumb}</span>
              </div>
              <div class="ios-proj-body">
                <div class="ios-proj-title">${item.name}</div>
                <div class="ios-proj-desc">${item.desc}</div>
                <div class="ios-proj-tags">
                  ${item.tags.map(t => `<span class="ios-proj-tag">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `
    })
  }

  buildBlog() {
    const items = lang.get('blog.items') || []
    this.screens.blog = new AppScreen({
      id: 'blog',
      title: 'Blog',
      content: `
        <div class="ios-section-header" data-i18n="blog.soon">Coming soon</div>
        <div class="ios-list">
          ${items.map(item => `
            <div class="ios-list-item">
              <div class="ios-list-icon" style="background:rgba(139,92,246,.2)">📄</div>
              <div class="ios-list-label">
                <div class="ios-list-label__main">${item.title}</div>
                <div class="ios-list-label__sub">${item.cat} · ${item.date}</div>
              </div>
              <div class="ios-chevron">›</div>
            </div>
          `).join('')}
        </div>
      `
    })
  }

  buildContact() {
    const links = lang.get('contact.links') || []
    const colors = [
      'rgba(71,118,230,.2)',
      'rgba(255,255,255,.08)',
      'rgba(139,92,246,.2)',
      'rgba(71,118,230,.2)',
    ]
    this.screens.contact = new AppScreen({
      id: 'contact',
      title: 'Contact',
      content: `
        <div class="ios-contact-hero">
          <h2><em data-i18n="contact.title">Let's talk.</em></h2>
          <p data-i18n="contact.subtitle">Have a project? Want to collaborate? Or just say hi.</p>
        </div>
        <div class="ios-contact-btns">
          ${links.map((l, i) => `
            <div class="ios-contact-btn">
              <div class="ios-contact-btn__icon" style="background:${colors[i] || 'rgba(255,255,255,.08)'}">
                ${l.icon}
              </div>
              <span>${l.label}</span>
            </div>
          `).join('')}
        </div>
      `
    })
  }
}