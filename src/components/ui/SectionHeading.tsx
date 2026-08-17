import { clsx } from 'clsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  tone?: 'light' | 'dark'
  serif?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  tone = 'light',
  serif = false,
}: SectionHeadingProps) {
  const isDark = tone === 'dark'

  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
          <span className="inline-block h-2 w-2 bg-brand-500" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={clsx(
          'mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tight',
          serif ? 'font-serif font-medium italic leading-[1.05]' : 'font-extrabold uppercase',
          isDark ? 'text-white' : 'text-ink-900',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={clsx('mt-5 text-lg', isDark ? 'text-ink-200' : 'text-ink-600')}>
          {description}
        </p>
      )}
    </div>
  )
}
