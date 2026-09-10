import { Head } from 'vite-react-ssg'
import { LOCALE_HTML_LANG, LOCALE_OG, LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/locales'
import { localizePath, stripLocalePrefix } from '@/lib/i18n/paths'

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://urbinisports.com.br'

interface SeoProps {
  title: string
  description: string
  path: string
  locale: Locale
  image?: string
  jsonLd?: Record<string, unknown>
}

export function Seo({ title, description, path, locale, image, jsonLd }: SeoProps) {
  const url = new URL(path, SITE_URL).toString()
  const ogImage = image ? new URL(image, SITE_URL).toString() : undefined
  const basePath = stripLocalePrefix(path)

  return (
    <Head>
      <html lang={LOCALE_HTML_LANG[locale]} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {LOCALES.map((altLocale) => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={LOCALE_HTML_LANG[altLocale]}
          href={new URL(localizePath(basePath, altLocale), SITE_URL).toString()}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={new URL(localizePath(basePath, DEFAULT_LOCALE), SITE_URL).toString()} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={LOCALE_OG[locale]} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  )
}
