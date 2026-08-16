import type { Athlete } from '@/data/athletes'

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
  return (
    <article className="overflow-hidden rounded-xl border border-ink-100 bg-white shadow-sm">
      <img
        src={athlete.photoUrl}
        alt={`Foto de ${athlete.name}`}
        loading="lazy"
        decoding="async"
        width={400}
        height={500}
        className="aspect-[4/5] w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-ink-900">{athlete.name}</h3>
        <p className="text-sm text-ink-600">
          {athlete.position} &middot; {athlete.club}
        </p>
        <a
          href={athlete.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${athlete.name}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm"
        >
          <InstagramIcon />
          Instagram
        </a>
      </div>
    </article>
  )
}
