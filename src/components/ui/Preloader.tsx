import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

const STORAGE_KEY = 'urbini-intro-seen'
const MASK_IMAGE = '/athletes/bruno-fernandes.jpg'
const HOLD_MS = 2400
const LEAVE_MS = 800

type Phase = 'visible' | 'leaving' | 'done'

function getInitialPhase(): Phase {
  if (typeof window === 'undefined') return 'done'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
  if (window.sessionStorage.getItem(STORAGE_KEY)) return 'done'
  return 'visible'
}

export function Preloader() {
  const [phase, setPhase] = useState<Phase>(getInitialPhase)

  useEffect(() => {
    if (phase !== 'visible') return
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  }, [phase])

  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'visible') return
    const timer = window.setTimeout(() => setPhase('leaving'), HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const timer = window.setTimeout(() => setPhase('done'), LEAVE_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-ink-900 transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]',
        phase === 'leaving' ? 'pointer-events-none -translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <span
        className="preloader-mask text-[clamp(4.5rem,17vw,12rem)] font-extrabold uppercase leading-none tracking-tight"
        style={{ backgroundImage: `url(${MASK_IMAGE})` }}
      >
        UGS
      </span>
      <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-500">
        Urbini Global Sports
      </span>
    </div>
  )
}
