'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { Response } from '../../create-account/actions/create'

export interface ResetPasswordParams {
  token: string
  password: string
}

export async function resetPassword({
  token,
  password,
}: ResetPasswordParams): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    await payload.resetPassword({
      collection: 'customers',
      data: { token, password },
      overrideAccess: true,
    })
  } catch (e) {
    console.log('Password reset error', e)
    return { success: false, error: 'Une erreur est survenue' }
  }

  return { success: true }
}
