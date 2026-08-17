import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { useReveal } from '@/hooks/useReveal'

interface WipeRevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
  panelClassName?: string
}

export function WipeReveal({
  as: Tag = 'span',
  delay = 0,
  panelClassName = 'bg-brand-500',
  className,
  style,
  children,
  ...props
}: WipeRevealProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref}
      data-wipe={visible}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
      className={clsx('relative overflow-hidden', className)}
      {...props}
    >
      {children}
      <span aria-hidden="true" className={clsx('wipe-panel absolute inset-0', panelClassName)} />
    </Tag>
  )
}
