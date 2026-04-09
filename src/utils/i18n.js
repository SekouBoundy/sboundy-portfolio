/* src/utils/i18n.js */
// ═══════════════════════════════════════
//  i18n — standalone helper
// ═══════════════════════════════════════

import { content as en } from '../data/content.en.js'
import { content as fr } from '../data/content.fr.js'

const store = { en, fr }

let current = 'en'

export function setLocale(locale) {
  current = locale
}

export function t(key) {
  return key.split('.').reduce((acc, k) => acc?.[k], store[current]) ?? key
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n)
    if (val && val !== el.dataset.i18n) el.innerHTML = val
  })
}