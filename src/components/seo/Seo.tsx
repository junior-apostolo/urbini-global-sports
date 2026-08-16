import { Head } from 'vite-react-ssg'

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://urbinisports.com.br'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown>
}

export function Seo({ title, description, path, image, jsonLd }: SeoProps) {
  const url = new URL(path, SITE_URL).toString()
  const ogImage = image ? new URL(image, SITE_URL).toString() : undefined

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
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
