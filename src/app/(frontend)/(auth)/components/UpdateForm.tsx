'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Input } from '@/components/CustomerForm/Input'
import { SubmitButton } from '@/components/CustomerForm/SubmitButton'
import { Customer } from '@/payload-types'
import { Response } from '../../(account)/create-account/actions/create'
import { update } from '../actions/update'

export function UpdateForm({
  user,
  tiers,
}: {
  user: Customer
  tiers: Customer['tier'][]
}) {
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
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const result: Response = await update({ email, firstName, lastName })
    setIsLoading(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <FormContainer heading="Votre compte">
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="Prénom"
            type="text"
            name="firstname"
            defaultValue={user.firstName || ''}
          />
          <Input
            label="Nom"
            type="text"
            name="lastname"
            defaultValue={user.lastName || ''}
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={user.email || ''}
        />
        <fieldset>
          <legend>Votre forfait:</legend>
          {tiers.map((tier, index) => (
            <div key={index}>
              <input
                inert
                id={tier!}
                readOnly
                type="radio"
                checked={tier === user.tier}
              />
              <label htmlFor={tier!}>{tier}</label>
            </div>
          ))}
        </fieldset>
        {error && <div>{error}</div>}
        <SubmitButton
          loading={isLoading}
          text="Mettre à jour"
        ></SubmitButton>
      </form>
    </FormContainer>
  )
}
