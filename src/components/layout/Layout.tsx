import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Preloader } from '@/components/ui/Preloader'
import { PageBackdrop } from './PageBackdrop'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.style.setProperty('--page-bg', '#ffffff')
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <PageBackdrop />
      <Preloader />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
