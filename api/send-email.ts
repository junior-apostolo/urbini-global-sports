import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { contactSchema } from '../src/lib/validation/contactSchema.ts'

// Guard best-effort em memória, por instância de função (não persiste entre cold starts).
// Suficiente para reduzir abuso simples; para produção com tráfego relevante,
// migrar para um rate limiter compartilhado como @upstash/ratelimit.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = requestLog.get(ip)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestLog.set(ip, { count: 1, windowStart: now })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? req.socket.remoteAddress ?? 'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Muitas solicitações. Tente novamente em instantes.' })
  }

  const parseResult = contactSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({ error: 'Dados inválidos.', issues: parseResult.error.issues })
  }

  const { name, email, message, company } = parseResult.data

  // Honeypot preenchido: resposta de sucesso falsa para não alertar bots.
  if (company) {
    return res.status(200).json({ ok: true })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_DESTINATION_EMAIL!,
      replyTo: email,
      subject: `Novo contato via site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Falha ao enviar e-mail de contato:', error)
    return res.status(500).json({ error: 'Não foi possível enviar sua mensagem. Tente novamente.' })
  }
}
