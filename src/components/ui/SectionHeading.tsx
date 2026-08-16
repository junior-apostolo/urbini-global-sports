import { clsx } from 'clsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={clsx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
      )}
      <Heading className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg text-ink-600">{description}</p>}
    </div>
  )
}
