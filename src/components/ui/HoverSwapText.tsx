import type { ReactNode } from 'react'

interface HoverSwapTextProps {
  children: ReactNode
}

export function HoverSwapText({ children }: HoverSwapTextProps) {
  return (
    <span className="relative inline-block overflow-hidden align-top">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}
