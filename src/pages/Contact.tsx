import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/contact/ContactForm'
import { ROUTES_META } from '@/lib/seo/routesMeta'

export function Contact() {
  const meta = ROUTES_META.contact

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} image={meta.ogImage} />
      <Container className="py-16">
        <SectionHeading
          as="h1"
          eyebrow="Contato"
          title="Fale com a Urbini Sports"
          description="Tem interesse em gestão de carreira, parcerias ou representação de atletas? Envie sua mensagem."
        />

        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </Container>
    </>
  )
}
