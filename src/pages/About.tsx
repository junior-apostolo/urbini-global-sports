import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES_META } from '@/lib/seo/routesMeta'

const VALUES = [
  {
    title: 'Transparência',
    description: 'Comunicação clara em cada etapa da carreira do atleta, sem letras miúdas.',
  },
  {
    title: 'Cuidado integral',
    description: 'Acompanhamento esportivo, jurídico e pessoal, dentro e fora de campo.',
  },
  {
    title: 'Rede de relacionamento',
    description: 'Conexões construídas com clubes, olheiros e agentes em todo o país.',
  },
]

const DIFFERENTIALS = [
  'Planejamento de carreira personalizado para cada atleta',
  'Suporte em negociações contratuais e imagem',
  'Acompanhamento próximo de desempenho e evolução técnica',
]

export function About() {
  const meta = ROUTES_META.about

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} image={meta.ogImage} />

      <section className="border-b-2 border-ink-900 bg-ink-50">
        <Container className="py-24">
          <SectionHeading
            as="h1"
            eyebrow="Sobre nós"
            title="Gestão de carreiras com propósito"
            description="A Urbini Global Sports nasceu para acompanhar atletas de futebol em cada etapa da carreira, unindo estratégia esportiva, cuidado pessoal e uma rede de relacionamento sólida no futebol brasileiro."
          />
        </Container>
      </section>

      <Container className="space-y-24 py-24">
        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">Nossa missão</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">
            Potencializar o talento de cada atleta agenciado, oferecendo suporte completo para que
            possam se dedicar ao que fazem de melhor: jogar futebol.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">Nossos valores</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title}>
                <h3 className="font-extrabold uppercase tracking-tight text-ink-900">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">Diferenciais</h2>
          <ul className="mt-6 max-w-2xl space-y-3">
            {DIFFERENTIALS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-600">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </>
  )
}
