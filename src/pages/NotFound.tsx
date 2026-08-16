import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export function NotFound() {
  return (
    <>
      <Seo
        title="Página não encontrada — Urbini Sports"
        description="A página que você procura não existe ou foi movida."
        path="/404"
      />
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink-900">Página não encontrada</h1>
        <p className="text-ink-600">A página que você procura não existe ou foi movida.</p>
        <LinkButton to="/">Voltar para o início</LinkButton>
      </Container>
    </>
  )
}
