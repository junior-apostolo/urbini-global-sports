import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n/LocaleContext'

const FIELD_CLASSES =
  'mt-2 block w-full border-0 border-b-2 border-ink-600 bg-transparent px-0 py-2.5 text-lg text-white placeholder:text-ink-400 focus:border-brand-500 focus:outline-none'

export function ContactForm() {
  const t = useT()
  const { form, onSubmit, submitStatus } = useContactForm()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div>
        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-ink-400">
          {t.contactForm.nameLabel}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={FIELD_CLASSES}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-brand-300">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-ink-400">
          {t.contactForm.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={FIELD_CLASSES}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-brand-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-ink-400">
          {t.contactForm.messageLabel}
        </label>
        <textarea
          id="message"
          rows={4}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${FIELD_CLASSES} resize-y`}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-brand-300">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: mantido fora da visão e do fluxo de tab; bots costumam preenchê-lo */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">{t.contactForm.companyLabel}</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.contactForm.submitting : t.contactForm.submit}
      </Button>

      <div aria-live="polite" className="text-sm">
        {submitStatus === 'success' && (
          <p className="border-2 border-brand-500 px-5 py-4 font-extrabold uppercase tracking-wide text-white">
            {t.contactForm.success}
          </p>
        )}
        {submitStatus === 'error' && <p className="text-brand-300">{t.contactForm.error}</p>}
      </div>
    </form>
  )
}
