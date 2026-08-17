import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('border-2 border-ink-900 bg-white p-6', className)} {...props}>
      {children}
    </div>
  )
}
