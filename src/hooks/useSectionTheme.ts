import { useEffect, useRef } from 'react'

export function useSectionTheme<T extends HTMLElement>(color: string) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.style.setProperty('--page-bg', color)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [color])

  return ref
}
