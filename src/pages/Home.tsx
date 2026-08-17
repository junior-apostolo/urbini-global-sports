import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { WipeReveal } from '@/components/ui/WipeReveal'
import { LinkButton } from '@/components/ui/Button'
import { HoverSwapText } from '@/components/ui/HoverSwapText'
import { AthleteCarousel } from '@/components/athletes/AthleteCarousel'
import { ATHLETES_DATA } from '@/data/athletes'
import { ROUTES_META } from '@/lib/seo/routesMeta'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCountUp } from '@/hooks/useCountUp'
import { useReveal } from '@/hooks/useReveal'
import { useSectionTheme } from '@/hooks/useSectionTheme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const HERO_POSTER = 'https://placehold.co/1600x1000.webp?text=Urbini+Sports'

const FEATURED_ATHLETES = ATHLETES_DATA.slice(0, 4)

const TESTIMONIALS = [
  {
    quote:
      'A Urbini conduziu a transferência do nosso atleta com transparência total, do primeiro contato ao fechamento.',
    name: 'Diretor Desportivo',
    role: 'Clube parceiro',
  },
  {
    quote:
      'Profissionalismo raro no mercado. Cada decisão de carreira foi pensada a médio e longo prazo.',
    name: 'Agente associado',
    role: 'Rede de olheiros',
  },
  {
    quote: 'Acompanhamento próximo, dentro e fora de campo. Nossos atletas evoluíram com consistência.',
    name: 'Responsável técnico',
    role: 'Comissão técnica',
  },
]

interface StatCounterProps {
  label: string
  value: number
  suffix?: string
  active: boolean
}

function StatCounter({ label, value, suffix = '', active }: StatCounterProps) {
  const count = useCountUp(value, active)

  return (
    <div>
      <div className="text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-none tracking-tight text-brand-500">
        {count}
        {suffix}
      </div>
      <div className="mt-3 text-xs font-bold uppercase tracking-widest text-ink-600">{label}</div>
    </div>
  )
}

export function Home() {
  const meta = ROUTES_META.home
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

  const stats = useMemo(() => {
    const clubs = new Set(ATHLETES_DATA.map((athlete) => athlete.club))
    return [
      { label: 'Atletas agenciados', value: ATHLETES_DATA.length },
      { label: 'Clubes parceiros', value: clubs.size },
      { label: 'Anos de atuação', value: 8 },
      { label: 'Dedicação', value: 100, suffix: '%' },
    ]
  }, [])

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
      <Seo title={meta.title} description={meta.description} path={meta.path} image={meta.ogImage} jsonLd={jsonLd} />

      {/* HERO */}
      <section className="relative -mt-20 min-h-screen overflow-hidden bg-ink-900">
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
          <div className="absolute inset-0 bg-linear-to-b from-ink-900/55 via-ink-900/75 to-ink-900" />
        </div>

        <Container className="relative flex min-h-screen flex-col justify-end pt-40 pb-20">
          <div data-reveal="true" className="mb-6 flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 bg-brand-500" aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
              Gestão de Carreiras &amp; Performance
            </span>
          </div>

          <h1 className="max-w-5xl text-[clamp(2.75rem,9vw,7.25rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
            <WipeReveal as="span" className="block" delay={0}>
              Gestão de
            </WipeReveal>
            <WipeReveal as="span" className="block" delay={140}>
              Carreiras no
            </WipeReveal>
            <WipeReveal as="span" className="block text-brand-500" delay={280}>
              Futebol
            </WipeReveal>
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              ref={ctaRef}
              to="/atletas"
              onMouseMove={onCtaMouseMove}
              onMouseLeave={onCtaMouseLeave}
              style={ctaStyle}
              className="group inline-flex items-center gap-3 bg-brand-500 px-9 py-5 text-sm font-extrabold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <HoverSwapText>Conheça nossos atletas</HoverSwapText>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              Portfólio nacional &mdash; times de todo o Brasil
            </span>
          </div>
        </Container>
      </section>

      {/* MANIFESTO + STATS */}
      <section ref={manifestoThemeRef}>
        <Container className="py-28 sm:py-32">
          <Reveal as="h6" className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
            Manifesto
          </Reveal>
          <WipeReveal
            as="p"
            delay={100}
            className="block max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-ink-900"
          >
            Não gerimos contratos. Construímos carreiras. Cada atleta que representamos chega até
            nós com talento &mdash; nosso trabalho é transformar esse talento em trajetória:
            negociações justas, visibilidade e decisões que respeitam o tempo de cada jogador
            dentro e fora de campo.
          </WipeReveal>

          <div className="my-16 h-0.5 bg-ink-100" aria-hidden="true" />

          <div ref={statsRef} className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} active={statsVisible} />
            ))}
          </div>
        </Container>
      </section>

      {/* ATHLETES */}
      <section ref={athletesThemeRef} className="border-y-2 border-ink-900">
        <Container className="pt-28 pb-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Portfólio" title="Atletas em destaque" />
            <LinkButton to="/atletas" variant="secondary">
              Ver todos
            </LinkButton>
          </div>
        </Container>
        <div className="pb-16">
          <AthleteCarousel athletes={FEATURED_ATHLETES} />
        </div>
      </section>

      {/* CONFIANÇA */}
      <section ref={confiancaThemeRef}>
        <Container className="py-28">
          <SectionHeading eyebrow="Confiança" title="O que dizem sobre nós" serif />

          <div className="mt-14 grid grid-cols-1 border-t-2 border-l-2 border-ink-100 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
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
            <p className="text-xs font-bold uppercase tracking-widest text-ink-600">
              Clubes representados por nossos atletas
            </p>
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
            Não vendemos passes. Construímos legados dentro e fora de campo.
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
            Pronto para dar o próximo passo na sua carreira?
          </h2>
          <p className="max-w-xl text-ink-300">
            Entre em contato com a nossa equipe e descubra como a Urbini Global Sports pode ajudar você.
          </p>
          <LinkButton to="/contato">Fale conosco</LinkButton>
        </Container>
      </section>
    </>
  )
}
