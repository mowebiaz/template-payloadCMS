import Link from 'next/link'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Home() {
  const headers = await getHeaders()
  const payload = await getPayload({config})
  const {user} = await payload.auth({headers})

  return (
    <>
    {user ? 'Bienvenue ' + user.email + ' ' + user.roles?.map(role => role) : 'Bienvenue visiteur'}
      <h1>Home page</h1>
      <Link href={'/posts'}>Tous les posts</Link>
    </>
  )
}
