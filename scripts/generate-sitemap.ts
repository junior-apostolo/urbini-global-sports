import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ROUTES_META } from '../src/lib/seo/routesMeta.ts'

export async function generateSitemap(outDir: string) {
  const siteUrl = (process.env.VITE_SITE_URL ?? 'https://urbinisports.com.br').replace(/\/$/, '')

  const urls = Object.values(ROUTES_META)
    .map((route) => `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n  </url>`)
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

  await writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
  await writeFile(join(outDir, 'robots.txt'), robots, 'utf-8')
}
