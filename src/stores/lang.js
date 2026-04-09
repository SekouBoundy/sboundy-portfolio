import { derived } from 'svelte/store'
import { currentLang } from './index.js'
import { content as en } from '../data/content.en.js'
import { content as fr } from '../data/content.fr.js'

const translations = { en, fr }

export const t = derived(currentLang, ($lang) => {
  const data = translations[$lang] || translations.en
  return (key) => key.split('.').reduce((o, k) => o?.[k], data) ?? key
})