import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { Container } from '@/components/ui/Container'
import { HoverSwapText } from '@/components/ui/HoverSwapText'
import { TricoloreBar } from '@/components/ui/TricoloreBar'
import { useMagnetic } from '@/hooks/useMagnetic'

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
    <NavLink
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
    </NavLink>
  )
}

const NAV_ITEMS = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/atletas', label: 'Atletas' },
]

const clockFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

function useBrasiliaClock() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setLabel(`BRASÍLIA ${clockFormatter.format(new Date())} GMT-3`)
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return label
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const clockLabel = useBrasiliaClock()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink-900/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <NavLink
          to="/"
          className="font-serif text-lg font-medium tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:text-xl"
          onClick={() => setIsMenuOpen(false)}
        >
          Urbini<span className="text-brand-500">.</span>Global Sports
        </NavLink>

        <span
          aria-hidden="true"
          className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400 lg:block"
        >
          {clockLabel ?? ' '}
        </span>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <MagneticNavLink to={item.to} end={item.to === '/'} label={item.label} />
              </li>
            ))}
          </ul>
          <MagneticNavLink to="/contato" label="Contato" variant="button" />
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Navegação principal" className="border-t border-white/10 bg-ink-900 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
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
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'block px-3 py-2 text-xs font-bold uppercase tracking-widest',
                    isActive ? 'text-brand-500' : 'text-white hover:text-brand-400',
                  )
                }
              >
                Contato
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <TricoloreBar className="h-0.75" />
    </header>
  )
}
