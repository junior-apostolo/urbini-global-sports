import { useRef, useState, type MouseEvent } from 'react'

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null)
  const [transform, setTransform] = useState('translate(0, 0)')

  const onMouseMove = (event: MouseEvent<T>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * strength
    const y = (event.clientY - rect.top - rect.height / 2) * strength
    setTransform(`translate(${x}px, ${y}px)`)
  }

  const onMouseLeave = () => setTransform('translate(0, 0)')

  return { ref, style: { transform }, onMouseMove, onMouseLeave }
}
