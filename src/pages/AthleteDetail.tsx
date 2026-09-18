import { useEffect, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { LocaleLink } from '@/components/layout/LocaleLink'
import { InstagramIcon } from '@/components/athletes/InstagramIcon'
import { PositionPitch } from '@/components/athletes/PositionPitch'
import { Reveal } from '@/components/ui/Reveal'
import { TricoloreBar } from '@/components/ui/TricoloreBar'
import { findAthleteById } from '@/data/athletes'
import { calculateAge, formatBirthDate, getInstagramHandle, splitAthleteName } from '@/lib/athleteProfile'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { localizePath } from '@/lib/i18n/paths'
import { NotFound } from './NotFound'

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-widest text-brand-400">{label}</dt>
      <dd className="mt-1.5 text-base font-semibold text-white">{children}</dd>
    </div>
  )
}

function BigStat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    // dt must precede dd in the DOM; flex-col-reverse puts the big number visually on top.
    <div className="flex flex-col-reverse justify-end">
      <dt className="mt-3 text-[11px] font-bold uppercase tracking-widest text-ink-400">{label}</dt>
      <dd className="flex items-baseline gap-1.5 text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-none tabular-nums tracking-tight text-white">
        {value}
        <span className="text-sm font-bold uppercase tracking-widest text-brand-400">{unit}</span>
      </dd>
    </div>
  )
}

export function AthleteDetail() {
  const { athleteId } = useParams()
  const athlete = findAthleteById(athleteId)
  const { locale } = useLocale()
  const t = useT()

  // Arriving from a card halfway down the home page should start the profile at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [athleteId])

  if (!athlete) return <NotFound />

  const labels = t.athleteDetail
  const position = t.positions[athlete.position]
  const { given, family } = splitAthleteName(athlete.name)
  const age = calculateAge(athlete.birthDate)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: athlete.name,
    jobTitle: position,
    affiliation: athlete.club,
    birthDate: athlete.birthDate,
    height: { '@type': 'QuantitativeValue', value: athlete.heightCm, unitCode: 'CMT' },
    weight: { '@type': 'QuantitativeValue', value: athlete.weightKg, unitCode: 'KGM' },
    sameAs: [athlete.instagramUrl],
  }

  return (
    <>
      <Seo
        title={labels.seoTitle(athlete.name, position)}
        description={labels.seoDescription(athlete.name, position)}
        path={localizePath(`/atletas/${athlete.id}`, locale)}
        locale={locale}
        image={athlete.photoUrl}
        jsonLd={jsonLd}
      />

      {/* -mt-32 tucks the section under the fixed header, like the home hero. */}
      <section className="relative -mt-32 overflow-hidden bg-ink-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_88%_8%,rgba(206,43,55,0.28),transparent_70%)]"
        />

        <div className="relative grid lg:min-h-176 lg:grid-cols-[5fr_7fr]">
          <div className="relative aspect-4/5 bg-ink-100 sm:aspect-4/3 lg:aspect-auto lg:[clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]">
            <img
              src={athlete.photoUrl}
              alt={t.athletes.photoAlt(athlete.name)}
              width={800}
              height={1000}
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center gap-10 px-4 py-12 sm:px-6 lg:py-20 lg:pr-12 lg:pl-8 xl:pr-20">
            <LocaleLink
              to="/atletas"
              className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 lg:mt-24"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              {labels.backToAthletes}
            </LocaleLink>

            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">
                  <span className="inline-block h-2 w-2 bg-brand-500" aria-hidden="true" />
                  {labels.eyebrow}
                </p>
                <h1 className="mt-4">
                  {given && (
                    <span
                      className="block text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase leading-none tracking-widest text-transparent"
                      style={{ WebkitTextStroke: '1.5px var(--color-brand-400)' }}
                    >
                      {given}
                    </span>
                  )}{' '}
                  <span className="block wrap-break-word text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                    {family}
                  </span>
                </h1>
              </div>

              <PositionPitch position={athlete.position} className="w-40 shrink-0 sm:w-48" />
            </div>

            <Reveal>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                <Fact label={labels.birthDate}>{formatBirthDate(athlete.birthDate, locale)}</Fact>
                <Fact label={labels.position}>{position}</Fact>
                <Fact label={labels.club}>{athlete.club}</Fact>
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
                <BigStat label={labels.age} value={age} unit={labels.ageUnit} />
                <BigStat label={labels.height} value={athlete.heightCm} unit="cm" />
                <BigStat label={labels.weight} value={athlete.weightKg} unit="kg" />
              </dl>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={athlete.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 bg-brand-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
              >
                <InstagramIcon size={18} />
                <span>{labels.instagramCta}</span>
                <span className="font-semibold normal-case tracking-normal text-white/80">
                  {getInstagramHandle(athlete.instagramUrl)}
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <TricoloreBar className="h-0.75" />
      </section>
    </>
  )
}
