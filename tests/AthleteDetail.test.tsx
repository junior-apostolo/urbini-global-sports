import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AthleteDetail } from '@/pages/AthleteDetail'
import { ATHLETES_DATA } from '@/data/athletes'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'

// <Head> needs the HelmetProvider that only vite-react-ssg mounts; head tags aren't under test here.
vi.mock('@/components/seo/Seo', () => ({ Seo: () => null }))

const athlete = ATHLETES_DATA[0]

function renderDetail(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LocaleProvider>
        <Routes>
          <Route path="/atletas/:athleteId" element={<AthleteDetail />} />
          <Route path="/en/atletas/:athleteId" element={<AthleteDetail />} />
        </Routes>
      </LocaleProvider>
    </MemoryRouter>,
  )
}

describe('AthleteDetail', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('exibe as características do atleta', () => {
    renderDetail(`/atletas/${athlete.id}`)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(athlete.name)
    expect(screen.getByRole('img', { name: `Foto de ${athlete.name}` })).toHaveAttribute(
      'src',
      athlete.photoUrl,
    )
    expect(screen.getByText('Goleiro')).toBeInTheDocument()
    expect(screen.getByText(athlete.club)).toBeInTheDocument()
    expect(screen.getByText('14 de março de 2000')).toBeInTheDocument()
    expect(screen.getByText('Idade').nextElementSibling).toHaveTextContent(/^\d+anos$/)
    expect(screen.getByText('Altura').nextElementSibling).toHaveTextContent(`${athlete.heightCm}cm`)
    expect(screen.getByText('Peso').nextElementSibling).toHaveTextContent(`${athlete.weightKg}kg`)
  })

  it('linka para o Instagram do atleta em nova aba', () => {
    renderDetail(`/atletas/${athlete.id}`)
    const link = screen.getByRole('link', { name: /Seguir no Instagram/ })
    expect(link).toHaveAttribute('href', athlete.instagramUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('oferece caminho de volta para a lista de atletas no idioma da rota', () => {
    renderDetail(`/en/atletas/${athlete.id}`)
    expect(screen.getByRole('link', { name: 'Back to athletes' })).toHaveAttribute(
      'href',
      '/en/atletas',
    )
  })

  it('mostra a página 404 para um atleta inexistente', () => {
    renderDetail('/atletas/nao-existe')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Página não encontrada' }),
    ).toBeInTheDocument()
  })
})
