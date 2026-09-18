import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AthleteCarousel } from '@/components/athletes/AthleteCarousel'
import { ATHLETES_DATA } from '@/data/athletes'
import { renderWithProviders } from './testUtils'

const scrollBy = vi.fn()
const scrollTo = vi.fn()

/** happy-dom does no layout, so fake 280px cards in a 1000px viewport with a track of `scrollWidth`. */
function mockLayout(scrollWidth = 2400) {
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(280)
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1000)
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(scrollWidth)
}

function renderCarousel() {
  renderWithProviders(<AthleteCarousel athletes={ATHLETES_DATA} />)
  return screen.getByRole('region', { name: 'Carrossel de atletas' })
}

describe('AthleteCarousel', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
    Element.prototype.scrollBy = scrollBy
    Element.prototype.scrollTo = scrollTo
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    scrollBy.mockClear()
    scrollTo.mockClear()
  })

  it('renderiza um card clicável para cada atleta', () => {
    renderCarousel()
    for (const athlete of ATHLETES_DATA) {
      expect(screen.getByRole('link', { name: `Ver perfil de ${athlete.name}` })).toHaveAttribute(
        'href',
        `/atletas/${athlete.id}`,
      )
    }
  })

  it('começa no início: voltar desabilitado e avançar habilitado', () => {
    renderCarousel()
    expect(screen.getByRole('button', { name: 'Atletas anteriores' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Próximos atletas' })).toBeEnabled()
  })

  it('avança uma página de cards ao clicar em próximos', async () => {
    mockLayout()
    renderCarousel()

    await userEvent.click(screen.getByRole('button', { name: 'Próximos atletas' }))

    expect(scrollBy).toHaveBeenCalledTimes(1)
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: 840 }))
  })

  describe('rolagem automática', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      mockLayout()
    })

    const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

    it('avança um card a cada intervalo', () => {
      renderCarousel()

      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenLastCalledWith(expect.objectContaining({ left: 280 }))

      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(2)
    })

    it('volta ao início ao chegar no fim do trilho', () => {
      vi.restoreAllMocks()
      mockLayout(1000) // track no wider than the viewport => already at the end
      renderCarousel()

      advance(4000)

      expect(scrollBy).not.toHaveBeenCalled()
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 0 }))
    })

    it('pausa enquanto o mouse está sobre o carrossel', () => {
      const carousel = renderCarousel()

      fireEvent.pointerEnter(carousel, { pointerType: 'mouse' })
      advance(8000)
      expect(scrollBy).not.toHaveBeenCalled()

      fireEvent.pointerLeave(carousel)
      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(1)
    })

    it('pausa enquanto um card tem foco de teclado', () => {
      renderCarousel()
      const cardLink = screen.getByRole('link', { name: `Ver perfil de ${ATHLETES_DATA[0].name}` })

      act(() => cardLink.focus())
      advance(8000)
      expect(scrollBy).not.toHaveBeenCalled()

      act(() => cardLink.blur())
      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(1)
    })

    it('permite pausar e retomar pelo botão', () => {
      renderCarousel()

      fireEvent.click(screen.getByRole('button', { name: 'Pausar rotação automática' }))
      advance(8000)
      expect(scrollBy).not.toHaveBeenCalled()

      fireEvent.click(screen.getByRole('button', { name: 'Retomar rotação automática' }))
      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(1)
    })

    it('espera um intervalo inteiro depois de uma interação do usuário', () => {
      const carousel = renderCarousel()

      advance(3000)
      fireEvent.pointerDown(carousel)

      advance(1000) // the tick lands only 1s after the interaction, so it is skipped
      expect(scrollBy).not.toHaveBeenCalled()

      advance(4000)
      expect(scrollBy).toHaveBeenCalledTimes(1)
    })
  })
})
