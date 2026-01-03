'use client'

import { FormEvent, ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Input } from '@/components/CustomerForm/Input'
import { SubmitButton } from '@/components/CustomerForm/SubmitButton'
import { Response } from '../../create-account/actions/create'
import { login } from '../actions/login'
import './LoginForm.scss'
import Link from 'next/link'

export function LoginForm(): ReactElement {
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
    const password = formData.get('password') as string

    const result: Response = await login({ email, password })
    setIsLoading(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <FormContainer heading="Connexion">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
        />
        {error && <p className="error">{error}</p>}
        <SubmitButton
          text="Connexion"
          loading={isLoading}
        />
      </form>
      <div>
        <p>
          Vous n&apos;avez pas de compte?{' '}
          <Link href="/create-account">Inscrivez-vous</Link>
        </p>
      </div>
      <div>
        <Link href={'/forgot-password'}>Mot de passe oublié ?</Link>
      </div>
    </FormContainer>
  )
}
