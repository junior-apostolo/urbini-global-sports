export const LOCALES = ['pt', 'it', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: 'PT',
  it: 'IT',
  en: 'EN',
}

export const LOCALE_NAMES: Record<Locale, string> = {
  pt: 'Português',
  it: 'Italiano',
  en: 'English',
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  pt: 'pt-BR',
  it: 'it-IT',
  en: 'en-US',
}

export const LOCALE_OG: Record<Locale, string> = {
  pt: 'pt_BR',
  it: 'it_IT',
  en: 'en_US',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
