import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import type { Athlete } from '@/data/athletes'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useT } from '@/lib/i18n/LocaleContext'
import { AthleteCard } from './AthleteCard'

interface AthleteCarouselProps {
  athletes: Athlete[]
}

const AUTOPLAY_INTERVAL_MS = 2000

const CONTROL_CLASSES =
  'inline-flex size-12 items-center justify-center border-2 border-ink-900 text-ink-900 transition-colors duration-200 hover:bg-ink-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-900'

export function AthleteCarousel({ athletes }: AthleteCarouselProps) {
  const t = useT()
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const lastInteractionRef = useRef(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusedInTrack, setFocusedInTrack] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return

    const updateEdges = () => {
      setCanScrollPrev(node.scrollLeft > 1)
      setCanScrollNext(node.scrollLeft + node.clientWidth < node.scrollWidth - 1)
    }

    node.addEventListener('scroll', updateEdges, { passive: true })
    // Fires once on observe (initial state) and again whenever the viewport resizes.
    const observer = new ResizeObserver(updateEdges)
    observer.observe(node)

    return () => {
      node.removeEventListener('scroll', updateEdges)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /** "page" moves as many cards as fit in the viewport (arrows); "item" moves a single card (autoplay). */
  const scrollCarousel = useCallback(
    (direction: 1 | -1, step: 'page' | 'item') => {
      const node = scrollerRef.current
      const firstItem = node?.firstElementChild as HTMLElement | null | undefined
      if (!node || !firstItem) return

      const itemWidth = firstItem.offsetWidth
      const itemCount = step === 'item' ? 1 : Math.max(1, Math.floor(node.clientWidth / itemWidth))
      node.scrollBy({
        left: direction * itemCount * itemWidth,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    },
    [prefersReducedMotion],
  )

  const autoplayActive = !prefersReducedMotion && !userPaused && !hovered && !focusedInTrack && inView

  useEffect(() => {
    if (!autoplayActive) return

    const id = window.setInterval(() => {
      const node = scrollerRef.current
      if (!node || document.hidden) return
      // Give the visitor a full interval of quiet after they swipe, scroll or click before moving on.
      if (Date.now() - lastInteractionRef.current < AUTOPLAY_INTERVAL_MS) return

      const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 1
      if (atEnd) node.scrollTo({ left: 0, behavior: 'smooth' })
      else scrollCarousel(1, 'item')
    }, AUTOPLAY_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [autoplayActive, scrollCarousel])

  // Passive observers of how the visitor is using the carousel; native listeners since nothing here is an action.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    // Touch taps also fire emulated mouse events; only real pointer hover should hold the autoplay.
    const onPointerEnter = (event: PointerEvent) => setHovered(event.pointerType !== 'touch')
    const onPointerLeave = () => setHovered(false)
    const markInteraction = () => {
      lastInteractionRef.current = Date.now()
    }

    node.addEventListener('pointerenter', onPointerEnter)
    node.addEventListener('pointerleave', onPointerLeave)
    node.addEventListener('pointerdown', markInteraction)
    node.addEventListener('wheel', markInteraction, { passive: true })
    node.addEventListener('keydown', markInteraction)

    return () => {
      node.removeEventListener('pointerenter', onPointerEnter)
      node.removeEventListener('pointerleave', onPointerLeave)
      node.removeEventListener('pointerdown', markInteraction)
      node.removeEventListener('wheel', markInteraction)
      node.removeEventListener('keydown', markInteraction)
    }
  }, [])

  return (
    <section ref={sectionRef} aria-roledescription="carousel" aria-label={t.athletes.carouselAria}>
      <Container className="mb-6 flex justify-end gap-3">
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setUserPaused((paused) => !paused)}
            aria-label={userPaused ? t.athletes.carouselPlay : t.athletes.carouselPause}
            className={`${CONTROL_CLASSES} mr-3`}
          >
            {userPaused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
          </button>
        )}
        <button
          type="button"
          onClick={() => scrollCarousel(-1, 'page')}
          disabled={!canScrollPrev}
          aria-label={t.athletes.carouselPrev}
          className={CONTROL_CLASSES}
        >
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <button
          type="button"
          onClick={() => scrollCarousel(1, 'page')}
          disabled={!canScrollNext}
          aria-label={t.athletes.carouselNext}
          className={CONTROL_CLASSES}
        >
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </Container>

      <div
        ref={scrollerRef}
        onFocus={() => setFocusedInTrack(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocusedInTrack(false)
        }}
        className="athlete-carousel-scroller flex snap-x snap-mandatory overflow-x-auto py-3"
      >
        {athletes.map((athlete) => (
          <div key={athlete.id} className="w-70 shrink-0 snap-start pr-6 *:h-full">
            <AthleteCard athlete={athlete} />
          </div>
        ))}
      </div>
    </section>
  )
}
