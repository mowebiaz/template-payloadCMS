import { redirect } from 'next/navigation'
import config from '@payload-config'
import { getPayload } from 'payload'

interface SearchParams {
  [key: string]: string
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { token } = await searchParams
  const payload = await getPayload({ config })

  if (!token) {
    redirect(
      `/login?message=${encodeURIComponent('Le token de vérification est manquant')}`,
    )
  } else {
    const result = await payload.verifyEmail({
      collection: 'customers',
      token,
    })
    if (result) {
      redirect(
        `/login?message=${encodeURIComponent('Votre compte a bien été activé. Veuillez vous connecter.')}`,
      )
    } else {
      return (
        <div>
          <h1>Un problemme est survenu</h1>
          <p>Merci de contacter l&apos;administrateur</p>
        </div>
      )
    }
  }
}
