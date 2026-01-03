'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { Response } from '../../create-account/actions/create'

export async function ForgotPassword({
  email,
}: {
  email: string
}): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    await payload.forgotPassword({ collection: 'customers', data: { email } })
  } catch (e) {
    console.log('Forgot password error: ', e)
    return {
      success: false,
      error: 'Une erreur est survenue',
    }
  }

  return {
    success: true,
  }
}
