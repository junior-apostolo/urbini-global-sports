import { describe, expect, it } from 'vitest'
import { contactSchema } from '@/lib/validation/contactSchema'

const VALID_DATA = {
  name: 'Maria Souza',
  email: 'maria@example.com',
  message: 'Olá, gostaria de mais informações sobre a Urbini Sports.',
  company: '',
}

describe('contactSchema', () => {
  it('aceita um payload válido', () => {
    const result = contactSchema.safeParse(VALID_DATA)
    expect(result.success).toBe(true)
  })

  it('rejeita nome muito curto', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejeita e-mail inválido', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejeita mensagem muito curta', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, message: 'oi' })
    expect(result.success).toBe(false)
  })

  it('rejeita quando o honeypot vem preenchido', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, company: 'Bot Inc' })
    expect(result.success).toBe(false)
  })

  it('aceita quando o campo company está ausente', () => {
    const { company: _company, ...rest } = VALID_DATA
    const result = contactSchema.safeParse(rest)
    expect(result.success).toBe(true)
  })
})
