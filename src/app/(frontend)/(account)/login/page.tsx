import { ReactElement } from 'react'
import { redirect } from 'next/navigation'
import { getUser } from '../../(auth)/actions/getUser'
import { LoginForm } from './components/LoginForm'

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

  const { message } = await searchParams
  return (
    <div>
      <h1>Connexion</h1>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
      <LoginForm />
    </div>
  )
}
