import { Container } from '@/components/ui/Container'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <Container className="flex flex-col gap-2 py-8 text-sm text-ink-600 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} Urbini Sports. Todos os direitos reservados.</p>
        <p>Gestão de carreiras no futebol.</p>
      </Container>
    </footer>
  )
}
