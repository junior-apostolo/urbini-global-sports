import type { Athlete } from '@/data/athletes'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useT } from '@/lib/i18n/LocaleContext'

function InstagramIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
    </svg>
  )
}

interface AthleteCardProps {
  athlete: Athlete
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic<HTMLElement>(0.05)
  const t = useT()
  const position = t.positions[athlete.position]

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
          className="h-full w-full object-cover grayscale contrast-125 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />

        <span className="absolute top-3 left-3 bg-brand-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white">
          {position}
        </span>

        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-ink-900/85 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-[11px] uppercase tracking-widest text-brand-300">{athlete.club}</p>
          <a
            href={athlete.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.athletes.instagramAria(athlete.name)}
            className="inline-flex items-center gap-2 bg-brand-500 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t-2 border-ink-900 p-4">
        <h3 className="text-base font-extrabold tracking-tight text-ink-900">{athlete.name}</h3>
        <p className="text-sm text-ink-600">
          {position} &middot; {athlete.club}
        </p>
      </div>
    </article>
  )
}
