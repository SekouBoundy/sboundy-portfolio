// src/stores/lang.ts
import { derived } from 'svelte/store'
import { currentLang } from './index'
import { content as en } from '../data/content.en'
import { content as fr } from '../data/content.fr'

const translations: Record<string, any> = { en, fr }

export const t = derived(currentLang, ($lang) => {
  const data = translations[$lang] ?? translations.en
  return (key: string) => key.split('.').reduce((o: any, k: string) => o?.[k], data) ?? key
})