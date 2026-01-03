'use client'

import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Input } from '@/components/CustomerForm/Input'
import { SubmitButton } from '@/components/CustomerForm/SubmitButton'
import { create, Response } from '../actions/create'
import './CreateForm.scss'

export function CreateForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }
    const result: Response = await create({
      email,
      password,
      firstName,
      lastName,
    })
    setIsLoading(false)

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Veuillez vérifier votre boîte de réception pour confirmer votre compte.')}`,
      )
    } else {
      setError(
        result.error || 'Une erreur est survenue lors de la création du compte',
      )
    }
  }

  return (
    <FormContainer heading={'Créer un compte'}>
      <form
        className="form-create"
        onSubmit={handleSubmit}
      >
        <div className="form__row">
          <Input
            label="Prénom"
            name="firstName"
            type="text"
            placeholder="Prénom"
            required
          />
          <Input
            label="Nom"
            name="lastName"
            type="text"
            placeholder="Nom"
            required
          />
        </div>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <Input
          label="Confirmer le mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          required
        />
        {error && <p className="form__error">{error}</p>}

        <SubmitButton
          loading={isLoading}
          text="Créer mon compte"
        />
      </form>
      <div className="form__redirect">
        <p>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </div>
    </FormContainer>
  )
}
