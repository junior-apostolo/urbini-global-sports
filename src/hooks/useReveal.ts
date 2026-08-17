import { useEffect, useRef, useState } from 'react'

const SUPPORTS_INTERSECTION_OBSERVER = typeof IntersectionObserver !== 'undefined'

export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(!SUPPORTS_INTERSECTION_OBSERVER)

  useEffect(() => {
    if (!SUPPORTS_INTERSECTION_OBSERVER) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
