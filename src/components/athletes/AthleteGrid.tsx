import type { ReactNode } from 'react'
import type { Athlete } from '@/data/athletes'
import { useParallax } from '@/hooks/useParallax'
import { useT } from '@/lib/i18n/LocaleContext'
import { AthleteCard } from './AthleteCard'

interface AthleteGridProps {
  athletes: Athlete[]
}

const PARALLAX_SPEEDS = [0.02, 0.035, 0.025, 0.04]

function ParallaxItem({ speed, children }: { speed: number; children: ReactNode }) {
  const ref = useParallax<HTMLDivElement>(speed)
  return <div ref={ref}>{children}</div>
}

export function AthleteGrid({ athletes }: AthleteGridProps) {
  const t = useT()

  if (athletes.length === 0) {
    return (
      <p className="border-2 border-ink-900 px-6 py-8 text-sm text-ink-600">{t.athletes.emptyMessage}</p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {athletes.map((athlete, index) => (
        <ParallaxItem key={athlete.id} speed={PARALLAX_SPEEDS[index % PARALLAX_SPEEDS.length]}>
          <AthleteCard athlete={athlete} />
        </ParallaxItem>
      ))}
    </div>
  )
}
