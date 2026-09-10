import { DEFAULT_LOCALE, isLocale, type Locale } from './locales.ts'

const LOCALE_PREFIXES: Record<Locale, string> = {
  pt: '',
  it: '/it',
  en: '/en',
}

/** Reads the locale from a pathname (e.g. "/it/sobre" -> "it"), defaulting to pt. */
export function detectLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/')[1] ?? ''
  return isLocale(segment) ? segment : DEFAULT_LOCALE
}

/** Removes the locale prefix from a pathname, always returning a pt-rooted path. */
export function stripLocalePrefix(pathname: string): string {
  const locale = detectLocaleFromPathname(pathname)
  const prefix = LOCALE_PREFIXES[locale]
  if (!prefix) return pathname
  const stripped = pathname.slice(prefix.length)
  return stripped === '' ? '/' : stripped
}

/** Builds the localized path for a base (pt-rooted) path, e.g. ("/sobre", "it") -> "/it/sobre". */
export function localizePath(basePath: string, locale: Locale): string {
  const prefix = LOCALE_PREFIXES[locale]
  if (!prefix) return basePath
  if (basePath === '/') return prefix
  return `${prefix}${basePath}`
}

/** Rewrites any internal path to the equivalent path in the target locale. */
export function switchPathLocale(pathname: string, targetLocale: Locale): string {
  return localizePath(stripLocalePrefix(pathname), targetLocale)
}
