import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/Button'

export function ContactForm() {
  const { form, onSubmit, submitStatus } = useContactForm()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-900">
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="mt-1 block w-full rounded-md border border-ink-100 px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-900">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 block w-full rounded-md border border-ink-100 px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-900">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="mt-1 block w-full rounded-md border border-ink-100 px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: mantido fora da visão e do fluxo de tab; bots costumam preenchê-lo */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Empresa</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
      </Button>

      <div aria-live="polite" className="text-sm">
        {submitStatus === 'success' && (
          <p className="text-green-700">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600">Não foi possível enviar sua mensagem. Tente novamente.</p>
        )}
      </div>
    </form>
  )
}
