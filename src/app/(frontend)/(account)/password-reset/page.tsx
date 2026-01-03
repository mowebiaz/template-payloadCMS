import { ReactElement } from 'react'
import { redirect } from 'next/navigation'
import { getUser } from '../../(auth)/actions/getUser'
import { ResetPasswordForm } from './components/ResetPasswordForm'

interface SearchParams {
  [key: string]: string | undefined
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<ReactElement> {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  const { message, token } = await searchParams

  if (token) {
    return (
      <div>
        <div>{message && <p>{message}</p>}</div>
        <ResetPasswordForm token={token} />
      </div>
    )
  } else {
    redirect(`/login?message=${encodeURIComponent('Le token est manquant')}`)
  }
}
