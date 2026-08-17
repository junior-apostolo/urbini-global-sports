import type { ElementType, HTMLAttributes } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
}

export function Reveal({ as: Tag = 'div', delay = 0, style, ...props }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref}
      data-reveal={visible}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...props}
    />
  )
}
