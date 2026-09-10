import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PositionFilter, ALL_POSITIONS } from '@/components/athletes/PositionFilter'
import { renderWithProviders } from './testUtils'

describe('PositionFilter', () => {
  it('marca a posição ativa com aria-pressed', () => {
    renderWithProviders(<PositionFilter value="Atacante" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Atacante' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: ALL_POSITIONS })).toHaveAttribute('aria-pressed', 'false')
  })

  it('chama onChange com a posição clicada', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithProviders(<PositionFilter value={ALL_POSITIONS} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Goleiro' }))

    expect(onChange).toHaveBeenCalledWith('Goleiro')
  })
})
