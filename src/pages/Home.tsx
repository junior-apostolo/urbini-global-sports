import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LinkButton } from '@/components/ui/Button'
import { AthleteGrid } from '@/components/athletes/AthleteGrid'
import { ATHLETES_DATA } from '@/data/athletes'
import { ROUTES_META } from '@/lib/seo/routesMeta'

const FEATURED_ATHLETES = ATHLETES_DATA.slice(0, 4)

export function Home() {
  const meta = ROUTES_META.home

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Urbini Sports',
    description: meta.description,
    url: 'https://urbinisports.com.br',
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} image={meta.ogImage} jsonLd={jsonLd} />

      <section className="border-b border-ink-100 bg-ink-50">
        <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Gestão de carreiras no futebol
            </h1>
            <p className="mt-6 text-lg text-ink-600">
              A Urbini Sports conecta talento a oportunidades, cuidando de cada etapa da carreira
              dos atletas que representa &mdash; dentro e fora de campo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton to="/atletas">Conheça os atletas</LinkButton>
              <LinkButton to="/contato" variant="secondary">
                Fale conosco
              </LinkButton>
            </div>
          </div>
          <img
            src="https://placehold.co/640x480.webp?text=Urbini+Sports"
            alt="Atletas agenciados pela Urbini Sports em campo"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={640}
            height={480}
            className="w-full rounded-xl object-cover"
          />
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <SectionHeading
            eyebrow="Sobre a Urbini Sports"
            title="Estratégia e cuidado em cada etapa da carreira"
            description="Unimos planejamento esportivo, suporte jurídico e uma rede de relacionamento sólida para que cada atleta possa focar no que faz de melhor."
          />
          <div className="mt-6">
            <LinkButton to="/sobre" variant="ghost">
              Saiba mais sobre nós
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 bg-ink-50">
        <Container className="py-16">
          <SectionHeading eyebrow="Portfólio" title="Atletas em destaque" />
          <div className="mt-8">
            <AthleteGrid athletes={FEATURED_ATHLETES} />
          </div>
          <div className="mt-8">
            <LinkButton to="/atletas" variant="secondary">
              Ver todos os atletas
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100">
        <Container className="flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            Pronto para dar o próximo passo na sua carreira?
          </h2>
          <p className="max-w-xl text-ink-600">
            Entre em contato com a nossa equipe e descubra como a Urbini Sports pode ajudar você.
          </p>
          <LinkButton to="/contato">Fale conosco</LinkButton>
        </Container>
      </section>
    </>
  )
}
