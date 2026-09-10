import { clsx } from 'clsx'
import { POSITIONS, type Position } from '@/data/athletes'
import { useT } from '@/lib/i18n/LocaleContext'

export const ALL_POSITIONS = 'Todos' as const
export type PositionFilterValue = Position | typeof ALL_POSITIONS

interface PositionFilterProps {
  value: PositionFilterValue
  onChange: (value: PositionFilterValue) => void
}

export function PositionFilter({ value, onChange }: PositionFilterProps) {
  const t = useT()
  const options: PositionFilterValue[] = [ALL_POSITIONS, ...POSITIONS]

  return (
    <div
      className="inline-flex flex-wrap border-2 border-ink-900"
      role="group"
      aria-label={t.athletes.filterAria}
    >
      {options.map((option) => {
        const isActive = option === value
        const label = option === ALL_POSITIONS ? t.athletes.allPositions : t.positions[option]
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={clsx(
              'border-r-2 border-ink-900 px-4 py-3 text-xs font-extrabold uppercase tracking-widest transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
              isActive ? 'bg-brand-500 text-white' : 'bg-transparent text-ink-900 hover:bg-ink-100',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
