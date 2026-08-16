import { clsx } from 'clsx'
import { POSITIONS, type Position } from '@/data/athletes'

export const ALL_POSITIONS = 'Todos' as const
export type PositionFilterValue = Position | typeof ALL_POSITIONS

interface PositionFilterProps {
  value: PositionFilterValue
  onChange: (value: PositionFilterValue) => void
}

export function PositionFilter({ value, onChange }: PositionFilterProps) {
  const options: PositionFilterValue[] = [ALL_POSITIONS, ...POSITIONS]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar atletas por posição">
      {options.map((option) => {
        const isActive = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={clsx(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
              isActive
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-ink-100 bg-white text-ink-600 hover:border-brand-200 hover:text-brand-600',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
