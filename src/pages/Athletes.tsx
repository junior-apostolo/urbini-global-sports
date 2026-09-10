import { useMemo, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AthleteGrid } from '@/components/athletes/AthleteGrid'
import { PositionFilter, ALL_POSITIONS, type PositionFilterValue } from '@/components/athletes/PositionFilter'
import { ATHLETES_DATA } from '@/data/athletes'
import { getRouteMeta } from '@/lib/seo/routesMeta'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'

export function Athletes() {
  const [filter, setFilter] = useState<PositionFilterValue>(ALL_POSITIONS)
  const { locale } = useLocale()
  const t = useT()

  const filteredAthletes = useMemo(() => {
    if (filter === ALL_POSITIONS) return ATHLETES_DATA
    return ATHLETES_DATA.filter((athlete) => athlete.position === filter)
  }, [filter])

  const meta = getRouteMeta(locale, 'athletes')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ATHLETES_DATA.map((athlete, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: athlete.name,
        jobTitle: t.positions[athlete.position],
        affiliation: athlete.club,
        sameAs: [athlete.instagramUrl],
      },
    })),
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

      <section className="border-b-2 border-ink-900 bg-ink-50">
        <Container className="py-24">
          <SectionHeading
            as="h1"
            eyebrow={t.athletes.heroEyebrow}
            title={t.athletes.heroTitle}
            description={t.athletes.heroDescription}
          />
        </Container>
      </section>

      <Container className="py-16">
        <PositionFilter value={filter} onChange={setFilter} />

        <div className="mt-10">
          <AthleteGrid athletes={filteredAthletes} />
        </div>
      </Container>
    </>
  )
}
