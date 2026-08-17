import { useMemo, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AthleteGrid } from '@/components/athletes/AthleteGrid'
import { PositionFilter, ALL_POSITIONS, type PositionFilterValue } from '@/components/athletes/PositionFilter'
import { ATHLETES_DATA } from '@/data/athletes'
import { ROUTES_META } from '@/lib/seo/routesMeta'

export function Athletes() {
  const [filter, setFilter] = useState<PositionFilterValue>(ALL_POSITIONS)

  const filteredAthletes = useMemo(() => {
    if (filter === ALL_POSITIONS) return ATHLETES_DATA
    return ATHLETES_DATA.filter((athlete) => athlete.position === filter)
  }, [filter])

  const meta = ROUTES_META.athletes

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ATHLETES_DATA.map((athlete, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: athlete.name,
        jobTitle: athlete.position,
        affiliation: athlete.club,
        sameAs: [athlete.instagramUrl],
      },
    })),
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} image={meta.ogImage} jsonLd={jsonLd} />

      <section className="border-b-2 border-ink-900 bg-ink-50">
        <Container className="py-24">
          <SectionHeading
            as="h1"
            eyebrow="Portfólio"
            title="Atletas agenciados"
            description="Conheça os atletas representados pela Urbini Global Sports, filtrando por posição em campo."
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
