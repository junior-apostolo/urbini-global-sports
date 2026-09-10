import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { type LinkProps } from 'react-router-dom'
import { clsx } from 'clsx'
import { LocaleLink } from '@/components/layout/LocaleLink'
import { HoverSwapText } from './HoverSwapText'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
  secondary:
    'border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-white',
  ghost: 'bg-transparent text-brand-600 underline decoration-2 underline-offset-4 hover:text-brand-700',
}

const BASE_CLASSES =
  'group inline-flex items-center justify-center gap-2 px-8 py-3.5 font-extrabold text-xs uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

function renderLabel(children: ReactNode) {
  return typeof children === 'string' ? <HoverSwapText>{children}</HoverSwapText> : children
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props}>
      {renderLabel(children)}
    </button>
  )
}

interface LinkButtonProps extends LinkProps {
  variant?: Variant
  className?: string
}

export function LinkButton({ variant = 'primary', className, children, ...props }: LinkButtonProps) {
  return (
    <LocaleLink className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props}>
      {renderLabel(children)}
    </LocaleLink>
  )
}
