'use server'

import { cookies } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Customer } from '@/payload-types'
import { Response } from '../../create-account/actions/create'

interface LoginParams {
  email: string
  password: string
}

export type Result = {
  exp?: number
  token?: string
  user?: Customer
}

export async function login({
  email,
  password,
}: LoginParams): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const result: Result = await payload.login({
      collection: 'customers',
      data: { email, password },
    })
    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return {
        success: true,
      }
    } else {
      return {
        success: false,
        error: 'Email ou mot de passe incorrect',
      }
    }
  } catch (e) {
    console.log('Login error: ', e)
    return { success: false, error: 'Une erreur est survenue' }
  }
}
