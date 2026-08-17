import type { Athlete } from '@/data/athletes'
import { AthleteCard } from './AthleteCard'

interface AthleteCarouselProps {
  athletes: Athlete[]
}

export function AthleteCarousel({ athletes }: AthleteCarouselProps) {
  return (
    <div className="athlete-carousel overflow-hidden">
      <div className="athlete-carousel-track flex w-max animate-marquee-slow">
        {athletes.map((athlete) => (
          <div key={athlete.id} className="w-70 shrink-0 pr-6">
            <AthleteCard athlete={athlete} />
          </div>
        ))}
        {athletes.map((athlete) => (
          <div key={`${athlete.id}-dup`} className="w-70 shrink-0 pr-6" aria-hidden="true" inert>
            <AthleteCard athlete={athlete} />
          </div>
        ))}
      </div>
    </div>
  )
}
