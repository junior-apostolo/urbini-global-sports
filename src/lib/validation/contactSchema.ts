import { z } from 'zod'

export interface ContactValidationMessages {
  nameRequired: string
  nameTooLong: string
  emailRequired: string
  emailInvalid: string
  messageTooShort: string
  messageTooLong: string
}

const DEFAULT_MESSAGES: ContactValidationMessages = {
  nameRequired: 'Digite seu nome completo.',
  nameTooLong: 'Nome muito longo.',
  emailRequired: 'Digite seu e-mail.',
  emailInvalid: 'Digite um e-mail válido.',
  messageTooShort: 'Sua mensagem deve ter pelo menos 10 caracteres.',
  messageTooLong: 'Mensagem muito longa.',
}

export function createContactSchema(messages: ContactValidationMessages = DEFAULT_MESSAGES) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: messages.nameRequired })
      .max(120, { message: messages.nameTooLong }),
    email: z
      .string()
      .trim()
      .min(1, { message: messages.emailRequired })
      .email({ message: messages.emailInvalid }),
    message: z
      .string()
      .trim()
      .min(10, { message: messages.messageTooShort })
      .max(2000, { message: messages.messageTooLong }),
    // Honeypot: campo invisível para humanos; se vier preenchido, é bot.
    company: z.string().max(0).optional().or(z.literal('')),
  })
}

export const contactSchema = createContactSchema()

export type ContactFormData = z.infer<typeof contactSchema>
