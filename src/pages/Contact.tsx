import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/contact/ContactForm'
import { getRouteMeta } from '@/lib/seo/routesMeta'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'

export function Contact() {
  const { locale } = useLocale()
  const t = useT()
  const meta = getRouteMeta(locale, 'contact')

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} locale={locale} image={meta.ogImage} />

      <section className="bg-ink-900 py-24">
        <Container>
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow={t.contact.heroEyebrow}
            title={t.contact.heroTitle}
            description={t.contact.heroDescription}
          />

          <div className="mt-14 max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
