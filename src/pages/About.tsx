import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
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
      <Container className="space-y-16 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Sobre nós</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Gestão de carreiras com propósito
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            A Urbini Sports nasceu para acompanhar atletas de futebol em cada etapa da carreira,
            unindo estratégia esportiva, cuidado pessoal e uma rede de relacionamento sólida no
            futebol brasileiro.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Nossa missão</h2>
          <p className="mt-3 max-w-2xl text-ink-600">
            Potencializar o talento de cada atleta agenciado, oferecendo suporte completo para que
            possam se dedicar ao que fazem de melhor: jogar futebol.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Nossos valores</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title}>
                <h3 className="font-semibold text-ink-900">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Diferenciais</h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-600">
            {DIFFERENTIALS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  )
}
