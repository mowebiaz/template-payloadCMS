'use server'

import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import type { Customer } from '@/payload-types'

export async function getUser(): Promise<Customer | null> {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromise })
  const { user } = await payload.auth({ headers })

  if (user?.collection === 'customers') {
    return user || null
  }
  return null
}
