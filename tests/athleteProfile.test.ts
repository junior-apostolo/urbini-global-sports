import { describe, expect, it } from 'vitest'
import {
  calculateAge,
  formatBirthDate,
  getInstagramHandle,
  splitAthleteName,
} from '@/lib/athleteProfile'

describe('calculateAge', () => {
  it('não conta o ano quando o aniversário ainda não chegou', () => {
    expect(calculateAge('2000-03-14', new Date(2026, 2, 13))).toBe(25)
  })

  it('conta o ano no dia do aniversário', () => {
    expect(calculateAge('2000-03-14', new Date(2026, 2, 14))).toBe(26)
  })

  it('conta o ano depois do aniversário', () => {
    expect(calculateAge('2000-03-14', new Date(2026, 11, 31))).toBe(26)
  })
})

describe('formatBirthDate', () => {
  it('formata a data por extenso em cada idioma sem deslocar o dia', () => {
    expect(formatBirthDate('2000-03-14', 'pt')).toBe('14 de março de 2000')
    expect(formatBirthDate('2000-03-14', 'it')).toBe('14 marzo 2000')
    expect(formatBirthDate('2000-03-14', 'en')).toBe('March 14, 2000')
  })
})

describe('getInstagramHandle', () => {
  it('extrai o @ da URL do perfil', () => {
    expect(getInstagramHandle('https://www.instagram.com/joaopedrosilva/')).toBe('@joaopedrosilva')
    expect(getInstagramHandle('https://instagram.com/joao?igsh=abc')).toBe('@joao')
  })

  it('devolve a URL original quando não reconhece o formato', () => {
    expect(getInstagramHandle('https://example.com/x')).toBe('https://example.com/x')
  })
})

describe('splitAthleteName', () => {
  it('separa o sobrenome dos demais nomes', () => {
    expect(splitAthleteName('João Pedro Silva')).toEqual({ given: 'João Pedro', family: 'Silva' })
    expect(splitAthleteName('Rafael Costa')).toEqual({ given: 'Rafael', family: 'Costa' })
  })

  it('aceita nome único', () => {
    expect(splitAthleteName('Neymar')).toEqual({ given: '', family: 'Neymar' })
  })
})
