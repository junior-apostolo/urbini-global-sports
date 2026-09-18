import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { AthleteCard } from '@/components/athletes/AthleteCard'
import type { Athlete } from '@/data/athletes'
import { renderWithProviders } from './testUtils'

const athlete: Athlete = {
  id: 'test-athlete',
  name: 'Carlos Teste',
  position: 'Atacante',
  club: 'Clube Teste',
  birthDate: '2000-01-15',
  heightCm: 180,
  weightKg: 75,
  photoUrl: 'https://placehold.co/400x500.webp?text=Carlos+Teste',
  instagramUrl: 'https://www.instagram.com/carlosteste/',
}

describe('AthleteCard', () => {
  it('renderiza a foto com alt descritivo', () => {
    renderWithProviders(<AthleteCard athlete={athlete} />)
    const image = screen.getByRole('img', { name: `Foto de ${athlete.name}` })
    expect(image).toBeInTheDocument()
  })

  it('renderiza o link do Instagram com target e rel corretos', () => {
    renderWithProviders(<AthleteCard athlete={athlete} />)
    const link = screen.getByRole('link', { name: `Instagram de ${athlete.name}` })
    expect(link).toHaveAttribute('href', athlete.instagramUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('leva ao perfil do atleta', () => {
    renderWithProviders(<AthleteCard athlete={athlete} />)
    expect(screen.getByRole('link', { name: `Ver perfil de ${athlete.name}` })).toHaveAttribute(
      'href',
      '/atletas/test-athlete',
    )
  })

  it('prefixa o link do perfil em rotas de outro idioma', () => {
    renderWithProviders(<AthleteCard athlete={athlete} />, { route: '/en' })
    expect(screen.getByRole('link', { name: `View ${athlete.name}'s profile` })).toHaveAttribute(
      'href',
      '/en/atletas/test-athlete',
    )
  })
})
