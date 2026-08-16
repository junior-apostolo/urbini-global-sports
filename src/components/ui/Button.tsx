import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  secondary: 'bg-ink-100 text-ink-900 hover:bg-ink-100/70',
  ghost: 'bg-transparent text-brand-600 hover:bg-brand-50',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props} />
  )
}

interface LinkButtonProps extends LinkProps {
  variant?: Variant
  className?: string
}

export function LinkButton({ variant = 'primary', className, ...props }: LinkButtonProps) {
  return (
    <Link className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props} />
  )
}
