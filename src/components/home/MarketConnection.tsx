import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useT } from '@/lib/i18n/LocaleContext'

interface MarketCard {
  title: string
  image: string
}

const DEFAULT_BACKGROUND_IMAGE = '/hero-crowd.png'

const CARD_IMAGES = ['/scouting.png', '/identificacao.png', '/market.png', '/suporte.png']

const AUTOPLAY_INTERVAL_MS = 3200

function HeadingLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {line}
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  )
}

function MarketCarousel({ items, nextAria }: { items: MarketCard[]; nextAria: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const advance = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 24 : 240
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + amount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return
    const id = window.setInterval(advance, AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, isPaused])

  return (
    <div
      className="flex items-center gap-3 sm:gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scrollbar-none sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div key={item.image} data-card className="w-36 shrink-0 snap-start sm:w-44 lg:w-61.25">
            <div className="aspect-4/3 w-full overflow-hidden">
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 whitespace-pre-line text-xs font-extrabold leading-tight text-white sm:mt-4 sm:text-sm lg:text-base">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={advance}
        aria-label={nextAria}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
      >
        <ChevronRight aria-hidden="true" size={20} />
      </button>
    </div>
  )
}

interface MarketConnectionProps {
  backgroundImage?: string
}

export function MarketConnection({ backgroundImage = DEFAULT_BACKGROUND_IMAGE }: MarketConnectionProps) {
  const t = useT()
  const cardTitles = [
    t.marketConnection.cardScouting,
    t.marketConnection.cardIdentification,
    t.marketConnection.cardMarket,
    t.marketConnection.cardSupport,
  ]
  const cards: MarketCard[] = CARD_IMAGES.map((image, index) => ({ image, title: cardTitles[index] }))

  return (
    <section className="relative overflow-hidden bg-brand-700">
      <div className="grid lg:grid-cols-2">
        <div className="relative isolate flex min-h-104 min-w-0 flex-col justify-center overflow-hidden px-6 py-20 sm:px-10 lg:py-28">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 90% 70% at 15% 10%, color-mix(in srgb, white 10%, transparent), transparent 60%), linear-gradient(135deg, color-mix(in srgb, var(--color-brand-900) 45%, transparent) 0%, color-mix(in srgb, var(--color-brand-700) 60%, transparent) 45%, color-mix(in srgb, var(--color-brand-500) 78%, transparent) 100%)',
            }}
          />

          <div className="relative max-w-md">
            <Reveal
              as="h2"
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white"
            >
              <HeadingLines lines={t.marketConnection.leftHeading} />
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mt-6 max-w-sm text-sm leading-relaxed text-white/85 sm:text-base"
            >
              {t.marketConnection.leftText}
            </Reveal>
          </div>
        </div>

        <div
          className="relative flex min-w-0 flex-col justify-center gap-10 px-6 py-20 sm:px-10 lg:py-28"
          style={{
            backgroundImage:
              'linear-gradient(160deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%)',
          }}
        >
          <Reveal
            as="h3"
            delay={80}
            className="text-right text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white"
          >
            <HeadingLines lines={t.marketConnection.rightHeading} />
          </Reveal>

          <Reveal delay={160}>
            <MarketCarousel items={cards} nextAria={t.marketConnection.nextAria} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
