import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import config from '@payload-config'
import { getPayload } from 'payload'
import './AdminBar.scss'

export async function AdminBar() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    return (
      <div className="admin-bar">
        <p>Bienvenue {user.email}</p>
        <div>
          <Link href={'/admin'}>Dashboard</Link>
          <Link href={'/admin/logout'}>Logout</Link>
        </div>
      </div>
    )
  } else {
    return null
  }
}
