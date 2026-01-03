'use client'

import { FormEvent, ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Input } from '@/components/CustomerForm/Input'
import { SubmitButton } from '@/components/CustomerForm/SubmitButton'
import { Response } from '../../create-account/actions/create'
import { ForgotPassword } from '../actions/forgot-password'

export function ForgotPasswordForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string

    setIsLoading(false)
    const result: Response = await ForgotPassword({ email })

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Les instructions pour re-initialiser votre mot de passe vous ont été envoyées par email.')}`,
      )
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <FormContainer heading="Mot de passe oublié ?">
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
          />
          {error && <p>{error}</p>}
          <SubmitButton
            loading={isLoading}
            text="réinitialiser le mot de passe"
          />
        </form>
      </div>
    </FormContainer>
  )
}
