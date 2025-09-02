import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export async function AdminBar() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    return (
      <div>
        Bienvenue {user.email}
        <Link href={'/admin'}>Dashboard</Link>
        <Link href={'/admin/logout'}>Logout</Link>
      </div>
    )
  } else {
    return null
  }
}
