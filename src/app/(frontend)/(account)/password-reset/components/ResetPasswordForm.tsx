'use client'

import { FormEvent, ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Input } from '@/components/CustomerForm/Input'
import { SubmitButton } from '@/components/CustomerForm/SubmitButton'
import { Response } from '../../create-account/actions/create'
import { resetPassword } from '../actions/resetPassword'

export function ResetPasswordForm({ token }: { token: string }): ReactElement {
  const [isloading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    const result: Response = await resetPassword({
      token,
      password,
    })
    setIsLoading(false)

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Votre mot de passe a bien été mis à jour. Connectez-vous avec votre nouveau mot de passe.')}`,
      )
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <FormContainer heading="Re-initialiser votre mot de passe">
      <form onSubmit={handleSubmit}>
        <Input
          label="Nouveau mot de passe"
          type="password"
          name="password"
        />
        <Input
          label="Confirmer le nouveau mot de passe"
          type="password"
          name="confirmPassword"
        />
        {error && <p>{error}</p>}
        <SubmitButton
          loading={isloading}
          text="Re-initialiser mon mot de passe"
        />
      </form>
    </FormContainer>
  )
}
