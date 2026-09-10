import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { Container } from '@/components/ui/Container'
import { HoverSwapText } from '@/components/ui/HoverSwapText'
import { TricoloreBar } from '@/components/ui/TricoloreBar'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { LOCALE_LABELS, LOCALE_NAMES, LOCALES } from '@/lib/i18n/locales'
import { LocaleLink, LocaleNavLink } from './LocaleLink'

interface MagneticNavLinkProps {
  to: string
  end?: boolean
  label: string
  variant?: 'link' | 'button'
}

function MagneticNavLink({ to, end, label, variant = 'link' }: MagneticNavLinkProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(
    variant === 'button' ? 0.25 : 0.35,
  )

  return (
    <LocaleNavLink
      ref={ref}
      to={to}
      end={end}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className={
        variant === 'button'
          ? 'group inline-block bg-brand-500 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition-[background-color,transform] duration-200 ease-out hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900'
          : ({ isActive }) =>
              clsx(
                'group inline-block text-xs font-bold uppercase tracking-widest transition-[color,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                isActive ? 'text-brand-500' : 'text-white hover:text-brand-400',
              )
      }
    >
      <HoverSwapText>{label}</HoverSwapText>
    </LocaleNavLink>
  )
}

function LanguageSwitcher({ ariaLabel }: { ariaLabel: string }) {
  const { locale, pathForLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
      >
        {LOCALE_LABELS[locale]}
        <ChevronDown aria-hidden="true" size={14} className={clsx('transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-3 min-w-32 border-2 border-white/15 bg-ink-900 py-1 shadow-xl"
        >
          {LOCALES.map((option) => (
            <li key={option}>
              <Link
                to={pathForLocale(option)}
                role="option"
                aria-selected={option === locale}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors',
                  option === locale ? 'text-brand-500' : 'text-white hover:text-brand-400',
                )}
              >
                {LOCALE_LABELS[option]}
                <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-ink-400">
                  {LOCALE_NAMES[option]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Header() {
  const t = useT()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { to: '/', label: t.header.navHome },
    { to: '/sobre', label: t.header.navAbout },
    { to: '/atletas', label: t.header.navAthletes },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={clsx(
          '-z-10 absolute inset-0 bg-linear-to-b from-ink-900/75 via-ink-900/35 to-transparent transition-opacity duration-500 ease-out',
          isScrolled ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          '-z-10 absolute inset-0 bg-ink-900/95 backdrop-blur-md transition-opacity duration-500 ease-out',
          isScrolled ? 'opacity-100' : 'opacity-0',
        )}
      />

      <Container className="relative grid h-28 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <LocaleLink
          to="/"
          className="justify-self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/logo-ugs.svg" alt="Urbini Global Sports" className="h-28 w-auto" />
        </LocaleLink>

        <nav aria-label={t.header.ariaNav} className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <MagneticNavLink to={item.to} end={item.to === '/'} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 justify-self-end md:flex">
          <LocaleLink
            to="/contato"
            className="inline-flex items-center border-2 border-white/70 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            {t.header.contactCta}
          </LocaleLink>
          <LanguageSwitcher ariaLabel={t.header.languageAria} />
        </div>

        <button
          type="button"
          className="col-start-3 inline-flex items-center justify-self-end p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t.header.ariaCloseMenu : t.header.ariaOpenMenu}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label={t.header.ariaNav} className="border-t border-white/10 bg-ink-900 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <LocaleNavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'block px-3 py-2 text-xs font-bold uppercase tracking-widest',
                      isActive ? 'text-brand-500' : 'text-white hover:text-brand-400',
                    )
                  }
                >
                  {item.label}
                </LocaleNavLink>
              </li>
            ))}
            <li>
              <LocaleNavLink
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'block px-3 py-2 text-xs font-bold uppercase tracking-widest',
                    isActive ? 'text-brand-500' : 'text-white hover:text-brand-400',
                  )
                }
              >
                {t.header.mobileContact}
              </LocaleNavLink>
            </li>
            <li className="border-t border-white/10 px-3 pt-3">
              <LanguageSwitcher ariaLabel={t.header.languageAria} />
            </li>
          </ul>
        </nav>
      )}

      <TricoloreBar
        className={clsx(
          'relative h-0.75 transition-opacity duration-500 ease-out',
          isScrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
    </header>
  )
}
