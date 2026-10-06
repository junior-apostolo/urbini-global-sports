import { ArrowUpRight } from 'lucide-react'
import type { Athlete } from '@/data/athletes'
import { LocaleLink } from '@/components/layout/LocaleLink'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useT } from '@/lib/i18n/LocaleContext'
import { InstagramIcon } from './InstagramIcon'

interface AthleteCardProps {
  athlete: Athlete
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic<HTMLElement>(0.05)
  const t = useT()
  const position = athlete.position ? t.positions[athlete.position] : '-'

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden border-2 border-ink-900 bg-white transition-transform duration-300 ease-out"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-ink-100">
        <img
          src={athlete.photoUrl}
          alt={t.athletes.photoAlt(athlete.name)}
          loading="lazy"
          decoding="async"
          width={400}
          height={500}
          className="h-full w-full object-cover grayscale contrast-125 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
        />

        <span className="absolute top-3 left-3 bg-brand-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white">
          {position}
        </span>

        {/* Sits above the card-wide profile link (z-10) so it stays independently clickable. */}
        {athlete.instagramUrl && (
          <a
            href={athlete.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.athletes.instagramAria(athlete.name)}
            className="absolute right-3 bottom-3 z-10 inline-flex size-10 items-center justify-center bg-brand-500 text-white opacity-0 transition-[opacity,background-color] duration-200 group-hover:opacity-100 hover:bg-brand-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white pointer-coarse:opacity-100"
          >
            <InstagramIcon />
          </a>
        )}
      </div>

      <div className="flex items-start justify-between gap-3 border-t-2 border-ink-900 p-4">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold tracking-tight text-ink-900">
            {/* Stretched link: the ::after covers the whole card, so the card is one big click target without nesting anchors. */}
            <LocaleLink
              to={`/atletas/${athlete.id}`}
              aria-label={t.athletes.viewProfileAria(athlete.name)}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand-500"
            >
              {athlete.name}
            </LocaleLink>
          </h3>
          <p className="text-sm text-ink-600">
            {position} &middot; {athlete.club ?? '-'}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={20}
          className="mt-0.5 shrink-0 text-ink-900 transition-[transform,color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500"
        />
      </div>
    </article>
  )
}
