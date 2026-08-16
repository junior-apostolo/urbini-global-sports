import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-ink-100 bg-white p-6 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
