import type { Athlete } from '@/data/athletes'
import { AthleteCard } from './AthleteCard'

interface AthleteGridProps {
  athletes: Athlete[]
}

export function AthleteGrid({ athletes }: AthleteGridProps) {
  if (athletes.length === 0) {
    return <p className="text-sm text-ink-600">Nenhum atleta encontrado para esse filtro.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {athletes.map((athlete) => (
        <AthleteCard key={athlete.id} athlete={athlete} />
      ))}
    </div>
  )
}
