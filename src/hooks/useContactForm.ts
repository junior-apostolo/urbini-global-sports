import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContactSchema, type ContactFormData } from '@/lib/validation/contactSchema'
import { sendContactEmail } from '@/lib/api'
import { useT } from '@/lib/i18n/LocaleContext'

export type SubmitStatus = 'idle' | 'success' | 'error'

export function useContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const t = useT()
  const contactSchema = useMemo(() => createContactSchema(t.validation), [t])

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', company: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitStatus('idle')
    try {
      const result = await sendContactEmail(data)
      if (result.ok) {
        setSubmitStatus('success')
        form.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  })

  return { form, onSubmit, submitStatus }
}
