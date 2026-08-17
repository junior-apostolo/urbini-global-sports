import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useParallax<T extends HTMLElement>(speed = 0.08, maxOffset = 8) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion || typeof window === 'undefined') return

    let raf = 0

    const update = () => {
      raf = 0
      const rect = node.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const rawOffset = (viewportCenter - elementCenter) * speed
      const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))
      node.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      node.style.transform = ''
    }
  }, [speed, maxOffset, prefersReducedMotion])

  return ref
}
