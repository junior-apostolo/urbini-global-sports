import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ATHLETES_DATA } from '../src/data/athletes.ts'
import { localizePath } from '../src/lib/i18n/paths.ts'
import { getRouteMeta, ROUTE_KEYS } from '../src/lib/seo/routesMeta.ts'
import { LOCALES, DEFAULT_LOCALE, LOCALE_HTML_LANG } from '../src/lib/i18n/locales.ts'

export async function generateSitemap(outDir: string) {
  const siteUrl = (process.env.VITE_SITE_URL ?? 'https://urbinisports.com.br').replace(/\/$/, '')

  // Pt-rooted (unprefixed) paths; each one is expanded to every locale below.
  const basePaths = [
    ...ROUTE_KEYS.map((key) => getRouteMeta(DEFAULT_LOCALE, key).path),
    ...ATHLETES_DATA.map((athlete) => `/atletas/${athlete.id}`),
  ]

  const urls = basePaths
    .flatMap((basePath) =>
      LOCALES.map((locale) => {
        const alternates = LOCALES.map(
          (altLocale) =>
            `    <xhtml:link rel="alternate" hreflang="${LOCALE_HTML_LANG[altLocale]}" href="${siteUrl}${localizePath(basePath, altLocale)}" />`,
        ).join('\n')
        const defaultAlternate = `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localizePath(basePath, DEFAULT_LOCALE)}" />`

        return `  <url>\n    <loc>${siteUrl}${localizePath(basePath, locale)}</loc>\n${alternates}\n${defaultAlternate}\n  </url>`
      }),
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

  await writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
  await writeFile(join(outDir, 'robots.txt'), robots, 'utf-8')
}
