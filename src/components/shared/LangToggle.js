
/* src/components/shared/LangToggle.js */
// ═══════════════════════════════════════
//  Language Toggle — FR / EN
// ═══════════════════════════════════════

import { content } from '../../data/content.en.js'
import { content as contentFr } from '../../data/content.fr.js'

export class LangToggle {
  constructor() {
    this.current = 'en'
    this.data = { en: content, fr: contentFr }
  }

  setLang(lang) {
    this.current = lang

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n
      const val = this.resolve(this.data[lang], key)
      if (val !== undefined) el.innerHTML = val
    })

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang)
    })
  }

  resolve(obj, path) {
    return path.split('.').reduce((acc, k) => acc?.[k], obj)
  }

  get(key) {
    return this.resolve(this.data[this.current], key)
  }
}