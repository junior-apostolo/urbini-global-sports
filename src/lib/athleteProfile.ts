import { LOCALE_HTML_LANG, type Locale } from '@/lib/i18n/locales'

function parseIsoDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return { year, month, day }
}

/** Full years elapsed since `birthDate` (ISO YYYY-MM-DD), or `null` when the birth date isn't known. */
export function calculateAge(birthDate: string | null, today: Date = new Date()): number | null {
  if (!birthDate) return null
  const { year, month, day } = parseIsoDate(birthDate)
  const hadBirthdayThisYear =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day)
  return today.getFullYear() - year - (hadBirthdayThisYear ? 0 : 1)
}

/** Localized long date, e.g. "14 de março de 2000". Formatted in UTC so the day never shifts with the viewer's timezone. `null` when the birth date isn't known. */
export function formatBirthDate(birthDate: string | null, locale: Locale): string | null {
  if (!birthDate) return null
  const { year, month, day } = parseIsoDate(birthDate)
  return new Intl.DateTimeFormat(LOCALE_HTML_LANG[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

/** "@handle" extracted from an Instagram profile URL, or `null` when there's no Instagram on file. */
export function getInstagramHandle(instagramUrl: string | null): string | null {
  if (!instagramUrl) return null
  const handle = /instagram\.com\/([^/?#]+)/.exec(instagramUrl)?.[1]
  return handle ? `@${handle}` : instagramUrl
}

/** Splits a full name into given names and the last name, e.g. "João Pedro Silva" -> ["João Pedro", "Silva"]. */
export function splitAthleteName(name: string): { given: string; family: string } {
  const parts = name.trim().split(/\s+/)
  const family = parts.pop() ?? name
  return { given: parts.join(' '), family }
}
