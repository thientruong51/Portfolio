import enContent from './en'
import viContent from './vi'

export const contentByLanguage = {
  en: enContent,
  vi: viContent,
}

export function getContentByLanguage(language) {
  const normalized = language?.startsWith('vi') ? 'vi' : 'en'
  return contentByLanguage[normalized] || contentByLanguage.en
}