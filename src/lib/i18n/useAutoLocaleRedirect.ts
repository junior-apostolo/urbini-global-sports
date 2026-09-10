import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isLocale, type Locale } from './locales'
import { detectLocaleFromPathname, localizePath } from './paths'

const STORAGE_KEY = 'ugs-locale-redirected'

function preferredLocaleFromBrowser(): Locale | null {
  if (typeof navigator === 'undefined') return null
  for (const raw of navigator.languages ?? [navigator.language]) {
    const lang = raw?.split('-')[0]?.toLowerCase()
    if (lang && isLocale(lang)) return lang
  }
  return null
}

/**
 * On a visitor's first-ever page load (root, unprefixed pt URLs only), redirects to the
 * browser's preferred language if it's it/en. Runs only once per device — a flag in
 * localStorage prevents it from firing again, so an intentional switch back to pt sticks.
 */
export function useAutoLocaleRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (detectLocaleFromPathname(location.pathname) !== 'pt') return
    if (typeof window === 'undefined') return

    let alreadyRedirected = false
    try {
      alreadyRedirected = window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return
    }
    if (alreadyRedirected) return

    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      return
    }

    const preferred = preferredLocaleFromBrowser()
    if (!preferred || preferred === 'pt') return

    navigate(localizePath(location.pathname, preferred), { replace: true })
    // Runs once on mount; location/navigate deps intentionally excluded to avoid re-firing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
