import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Preloader } from '@/components/ui/Preloader'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'
import { useAutoLocaleRedirect } from '@/lib/i18n/useAutoLocaleRedirect'
import { PageBackdrop } from './PageBackdrop'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  useAutoLocaleRedirect()

  useEffect(() => {
    document.documentElement.style.setProperty('--page-bg', '#ffffff')
  }, [pathname])

  return (
    <LocaleProvider>
      <div className="flex min-h-screen flex-col">
        <PageBackdrop />
        <Preloader />
        <Header />
        <main className="flex-1 pt-32">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  )
}
