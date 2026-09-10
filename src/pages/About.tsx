import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { getRouteMeta } from '@/lib/seo/routesMeta'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'

export function About() {
  const { locale } = useLocale()
  const t = useT()
  const meta = getRouteMeta(locale, 'about')

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} locale={locale} image={meta.ogImage} />

      <section className="border-b-2 border-ink-900 bg-ink-50">
        <Container className="py-24">
          <SectionHeading
            as="h1"
            eyebrow={t.about.heroEyebrow}
            title={t.about.heroTitle}
            description={t.about.heroDescription}
          />
        </Container>
      </section>

      <Container className="space-y-24 py-24">
        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">{t.about.missionTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{t.about.missionText}</p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">{t.about.valuesTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {t.about.values.map((value) => (
              <Card key={value.title}>
                <h3 className="font-extrabold uppercase tracking-tight text-ink-900">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink-900">
            {t.about.differentialsTitle}
          </h2>
          <ul className="mt-6 max-w-2xl space-y-3">
            {t.about.differentials.map((item) => (
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
