import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { localizePath } from '@/lib/i18n/paths'

export function NotFound() {
  const { locale } = useLocale()
  const t = useT()

  return (
    <>
      <Seo
        title={t.notFound.seoTitle}
        description={t.notFound.seoDescription}
        path={localizePath('/404', locale)}
        locale={locale}
      />
      <Container className="flex flex-col items-center gap-5 py-32 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">{t.notFound.errorLabel}</p>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-ink-900">{t.notFound.title}</h1>
        <p className="text-ink-600">{t.notFound.text}</p>
        <LinkButton to="/">{t.notFound.button}</LinkButton>
      </Container>
    </>
  )
}
