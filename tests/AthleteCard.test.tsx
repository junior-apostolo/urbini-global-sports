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
})
