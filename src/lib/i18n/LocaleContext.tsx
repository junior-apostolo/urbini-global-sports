import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { DICTIONARIES, type Dictionary } from './dictionaries'
import { LOCALE_HTML_LANG, type Locale } from './locales'
import { detectLocaleFromPathname, localizePath, stripLocalePrefix, switchPathLocale } from './paths'

interface LocaleContextValue {
  locale: Locale
  t: Dictionary
  /** Path of the current page with no locale prefix (e.g. "/atletas"). */
  basePath: string
  /** Builds the current page's path in another locale. */
  pathForLocale: (targetLocale: Locale) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  const value = useMemo<LocaleContextValue>(() => {
    const locale = detectLocaleFromPathname(pathname)
    const basePath = stripLocalePrefix(pathname)
    return {
      locale,
      t: DICTIONARIES[locale],
      basePath,
      pathForLocale: (targetLocale) => switchPathLocale(pathname, targetLocale),
    }
  }, [pathname])

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[value.locale]
  }, [value.locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale/useT must be used within a LocaleProvider')
  return ctx
}

export function useLocale() {
  const { locale, basePath, pathForLocale } = useLocaleContext()
  return { locale, basePath, pathForLocale }
}

export function useT(): Dictionary {
  return useLocaleContext().t
}

/** Prefixes an internal (pt-rooted) path with the current locale. Use for building hrefs. */
export function useLocalizedHref(path: string): string {
  const { locale } = useLocaleContext()
  return localizePath(path, locale)
}
