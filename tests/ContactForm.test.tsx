import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/contact/ContactForm'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  it('mostra erros para os campos obrigatórios ao submeter vazio', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/digite seu nome completo/i)).toBeInTheDocument()
    expect(screen.getByText(/digite seu e-mail/i)).toBeInTheDocument()
    expect(screen.getByText(/pelo menos 10 caracteres/i)).toBeInTheDocument()
  })

  it('envia os dados e mostra mensagem de sucesso', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nome completo/i), 'Maria Souza')
    await user.type(screen.getByLabelText(/e-mail/i), 'maria@example.com')
    await user.type(
      screen.getByLabelText(/mensagem/i),
      'Olá, gostaria de mais informações sobre a Urbini Sports.',
    )

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/send-email', expect.any(Object)))
    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
  })

  it('mostra mensagem de erro quando o envio falha', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nome completo/i), 'Maria Souza')
    await user.type(screen.getByLabelText(/e-mail/i), 'maria@example.com')
    await user.type(
      screen.getByLabelText(/mensagem/i),
      'Olá, gostaria de mais informações sobre a Urbini Sports.',
    )

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/não foi possível enviar sua mensagem/i)).toBeInTheDocument()
  })
})
