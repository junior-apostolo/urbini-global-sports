import { clsx } from 'clsx'

interface TricoloreBarProps {
  className?: string
}

export function TricoloreBar({ className }: TricoloreBarProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('w-full', className)}
      style={{
        background:
          'linear-gradient(90deg, var(--color-green-500) 0% 33.33%, #ffffff 33.33% 66.66%, var(--color-brand-500) 66.66% 100%)',
      }}
    />
  )
}
