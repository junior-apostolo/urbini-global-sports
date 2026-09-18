import { useEffect, useMemo, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { WipeReveal } from '@/components/ui/WipeReveal'
import { LinkButton } from '@/components/ui/Button'
import { LocaleLink } from '@/components/layout/LocaleLink'
import { HoverSwapText } from '@/components/ui/HoverSwapText'
import { AthleteCarousel } from '@/components/athletes/AthleteCarousel'
import { MarketConnection } from '@/components/home/MarketConnection'
import { ATHLETES_DATA } from '@/data/athletes'
import { getRouteMeta } from '@/lib/seo/routesMeta'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCountUp } from '@/hooks/useCountUp'
import { useReveal } from '@/hooks/useReveal'
import { useSectionTheme } from '@/hooks/useSectionTheme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const HERO_POSTER = 'https://placehold.co/1600x1000.webp?text=Urbini+Sports'

interface StatCounterProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  active: boolean
}

function StatCounter({ label, value, prefix = '', suffix = '', active }: StatCounterProps) {
  const count = useCountUp(value, active)

  return (
    <div>
      <div className="text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-none tracking-tight text-brand-500">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-3 text-xs font-bold uppercase tracking-widest text-ink-600">{label}</div>
    </div>
  )
}

export function Home() {
  const { locale } = useLocale()
  const t = useT()
  const meta = getRouteMeta(locale, 'home')
  const { ref: ctaRef, style: ctaStyle, onMouseMove: onCtaMouseMove, onMouseLeave: onCtaMouseLeave } =
    useMagnetic<HTMLAnchorElement>()
  const { ref: statsRef, visible: statsVisible } = useReveal<HTMLDivElement>(0.4)
  const manifestoThemeRef = useSectionTheme<HTMLElement>('#ffffff')
  const athletesThemeRef = useSectionTheme<HTMLElement>('var(--color-ink-50)')
  const confiancaThemeRef = useSectionTheme<HTMLElement>('#ffffff')
  const impactoThemeRef = useSectionTheme<HTMLElement>('var(--color-green-500)')
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = videoRef.current
    if (!node || prefersReducedMotion || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {})
        else node.pause()
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const stats = useMemo(
    () => [
      { label: t.home.statAthletes, value: 20, prefix: '+' },
      { label: t.home.statScouting, value: 30, prefix: '+' },
      { label: t.home.statDedication, value: 100, suffix: '%' },
    ],
    [t],
  )

  const clubs = useMemo(
    () => Array.from(new Set(ATHLETES_DATA.map((athlete) => athlete.club))),
    [],
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Urbini Global Sports',
    description: meta.description,
    url: 'https://urbinisports.com.br',
  }

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        locale={locale}
        image={meta.ogImage}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative -mt-32 min-h-[92vh] overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          {prefersReducedMotion ? (
            <img
              src={HERO_POSTER}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover grayscale contrast-125"
            />
          ) : (
            <video
              ref={videoRef}
              aria-hidden="true"
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover grayscale contrast-125"
            >
              <source src="/videos/hero-football.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-linear-to-b from-ink-900/60 via-ink-900/35 to-ink-900/85" />
        </div>

        <Container className="relative flex min-h-[92vh] flex-col items-center justify-center pt-28 pb-28 text-center">
          <div
            data-reveal="true"
            className="mb-6 flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            <span className="inline-block h-2 w-2 bg-brand-400" aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">
              {t.home.heroEyebrow}
            </span>
          </div>

          <h1 className="max-w-3xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
            <WipeReveal as="span" className="block" delay={0}>
              {t.home.heroHeadlineLine1}
            </WipeReveal>
            <WipeReveal as="span" className="block" delay={140}>
              {t.home.heroHeadlineLine2}
            </WipeReveal>
          </h1>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LocaleLink
              ref={ctaRef}
              to="/contato"
              onMouseMove={onCtaMouseMove}
              onMouseLeave={onCtaMouseLeave}
              style={ctaStyle}
              className="group inline-flex items-center gap-3 bg-brand-500 px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <HoverSwapText>{t.home.heroCtaPrimary}</HoverSwapText>
              <ArrowRight aria-hidden="true" size={18} />
            </LocaleLink>
            <LocaleLink
              to="/atletas"
              className="inline-flex items-center gap-3 border-2 border-white/70 px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-white transition-colors duration-150 hover:border-white hover:bg-white hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <HoverSwapText>{t.home.heroCtaSecondary}</HoverSwapText>
            </LocaleLink>
          </div>
        </Container>
      </section>

      {/* MANIFESTO + STATS */}
      <section ref={manifestoThemeRef}>
        {/* Relative + full-width: lets the desktop image below break out of the max-w-6xl container and reach the real viewport edge. */}
        <div className="relative pt-28 sm:pt-32">
          <div className="mx-auto max-w-6xl pl-4 sm:pl-6 lg:pl-8">
            <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10">
              <div className="pr-4 sm:pr-6 lg:pr-0">
                <Reveal as="h6" className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
                  {t.home.manifestoEyebrow}
                </Reveal>
                <WipeReveal
                  as="p"
                  delay={100}
                  className="block max-w-2xl text-[clamp(1.4rem,3vw,2.25rem)] font-extrabold leading-[1.2] tracking-tight text-ink-900"
                >
                  {t.home.manifestoTextIntro}
                </WipeReveal>
                <WipeReveal
                  as="p"
                  delay={180}
                  className="mt-6 block max-w-xl text-sm leading-relaxed text-ink-700 sm:text-base"
                >
                  {t.home.manifestoTextBody}
                </WipeReveal>
              </div>

              {/* Mobile/tablet: image sits in normal flow, edge-to-edge. Hidden (but still reserving its space) at lg+, where the breakout version below takes over. */}
              <Reveal delay={120} className="relative aspect-4/5 w-full lg:invisible">
                <div
                  className="absolute inset-0 bg-ink-100"
                  style={{ clipPath: 'polygon(3% 0%, 100% 0%, 100% 100%, 3% 100%, 8% 50%)' }}
                  aria-hidden="true"
                />
                <img
                  src="/manifesto-team.png"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ clipPath: 'polygon(3% 0%, 100% 0%, 100% 100%, 3% 100%, 8% 50%)' }}
                />
              </Reveal>
            </div>
          </div>

          {/* Desktop: image breaks out of the container and bleeds flush to the real browser edge, regardless of viewport width. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block lg:w-[34%]"
          >
            <div
              className="absolute inset-0 bg-ink-100"
              style={{ clipPath: 'polygon(3% 0%, 100% 0%, 100% 100%, 3% 100%, 8% 50%)' }}
            />
            <img
              src="/manifesto-team.png"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: 'polygon(3% 0%, 100% 0%, 100% 100%, 3% 100%, 8% 50%)' }}
            />
          </div>
        </div>

        <Container className="pb-28 sm:pb-32">
          <div className="mt-16 h-0.5 bg-ink-100" aria-hidden="true" />

          <div ref={statsRef} className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} active={statsVisible} />
            ))}
          </div>
        </Container>
      </section>

      {/* MARKET CONNECTION */}
      <MarketConnection />

      {/* ATHLETES */}
      <section ref={athletesThemeRef} className="border-y-2 border-ink-900">
        <Container className="pt-28 pb-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.home.portfolioEyebrow} title={t.home.portfolioTitle} />
            <LinkButton to="/atletas" variant="secondary">
              {t.home.viewAll}
            </LinkButton>
          </div>
        </Container>
        <div className="pb-16">
          <AthleteCarousel athletes={ATHLETES_DATA} />
        </div>
      </section>

      {/* CONFIANÇA */}
      <section ref={confiancaThemeRef}>
        <Container className="py-28">
          <SectionHeading eyebrow={t.home.trustEyebrow} title={t.home.trustTitle} serif />

          <div className="mt-14 grid grid-cols-1 border-t-2 border-l-2 border-ink-100 sm:grid-cols-3">
            {t.home.testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex min-h-55 flex-col justify-between gap-6 border-r-2 border-b-2 border-ink-100 p-8"
              >
                <p className="font-serif text-xl italic leading-relaxed text-ink-800">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-extrabold text-ink-900">{testimonial.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-600">{t.home.clubsLabel}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {clubs.map((club) => (
                <span
                  key={club}
                  className="border-2 border-ink-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink-800"
                >
                  {club}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* IMPACTO */}
      <section ref={impactoThemeRef} className="overflow-hidden py-24">
        <Container>
          <WipeReveal
            as="p"
            panelClassName="bg-ink-900"
            className="block max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-ink-900"
          >
            {t.home.impactText}
          </WipeReveal>
        </Container>

        <div className="mt-16 overflow-hidden whitespace-nowrap" aria-hidden="true">
          <div className="inline-block animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <span
                key={i}
                className="mr-6 text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase leading-none tracking-tight text-transparent"
                style={{ WebkitTextStroke: '1.5px var(--color-ink-900)' }}
              >
                {clubs.join('   •   ')}&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-brand-500 bg-ink-900">
        <Container className="flex flex-col items-center gap-6 py-28 text-center">
          <h2 className="max-w-2xl text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold uppercase leading-tight tracking-tight text-white">
            {t.home.ctaHeading}
          </h2>
          <p className="max-w-xl text-ink-300">{t.home.ctaText}</p>
          <LinkButton to="/contato">{t.home.ctaButton}</LinkButton>
        </Container>
      </section>
    </>
  )
}
