import type { ContactFormData } from '@/lib/validation/contactSchema'

export interface SendContactEmailResult {
  ok: boolean
}

export async function sendContactEmail(data: ContactFormData): Promise<SendContactEmailResult> {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    return { ok: false }
  }

  return { ok: true }
}
