import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export function NotFound() {
  return (
    <>
      <Seo
        title="Página não encontrada — Urbini Global Sports"
        description="A página que você procura não existe ou foi movida."
        path="/404"
      />
      <Container className="flex flex-col items-center gap-5 py-32 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">Erro 404</p>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-ink-900">
          Página não encontrada
        </h1>
        <p className="text-ink-600">A página que você procura não existe ou foi movida.</p>
        <LinkButton to="/">Voltar para o início</LinkButton>
      </Container>
    </>
  )
}
