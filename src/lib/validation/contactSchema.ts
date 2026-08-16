import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Digite seu nome completo.' })
    .max(120, { message: 'Nome muito longo.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Digite seu e-mail.' })
    .email({ message: 'Digite um e-mail válido.' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Sua mensagem deve ter pelo menos 10 caracteres.' })
    .max(2000, { message: 'Mensagem muito longa.' }),
  // Honeypot: campo invisível para humanos; se vier preenchido, é bot.
  company: z.string().max(0).optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
