import { Container } from '@/components/ui/Container'
import { TricoloreBar } from '@/components/ui/TricoloreBar'
import { useT } from '@/lib/i18n/LocaleContext'
import { LocaleLink } from './LocaleLink'

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="overflow-hidden bg-ink-900 pb-10 text-white">
      <TricoloreBar className="h-0.75" />
      <div className="mt-14 mb-14 overflow-hidden whitespace-nowrap" aria-hidden="true">
        <div className="inline-block animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="mr-6 text-[clamp(3rem,9vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-transparent"
              style={{ WebkitTextStroke: '1.5px var(--color-ink-600)' }}
            >
              Urbini Global Sports&nbsp;&nbsp;&nbsp;Urbini Global Sports&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Container className="flex flex-col gap-6 text-xs tracking-wide text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.tagline}</p>
        <nav aria-label={t.footer.ariaFooter} className="flex gap-6">
          <LocaleLink to="/sobre" className="uppercase tracking-widest hover:text-brand-400">
            {t.footer.navAbout}
          </LocaleLink>
          <LocaleLink to="/atletas" className="uppercase tracking-widest hover:text-brand-400">
            {t.footer.navAthletes}
          </LocaleLink>
          <LocaleLink to="/contato" className="uppercase tracking-widest hover:text-brand-400">
            {t.footer.navContact}
          </LocaleLink>
        </nav>
        <p>{t.footer.copyright(year)}</p>
      </Container>
    </footer>
  )
}
