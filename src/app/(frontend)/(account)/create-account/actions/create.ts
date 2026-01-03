'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

interface CreateParams {
  email: string
  password: string
  firstName: string
  lastName?: string
}

export interface Response {
  success: boolean
  error?: string
}

export async function create({
  email,
  password,
  firstName,
  lastName,
}: CreateParams): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const find = await payload.find({
      collection: 'customers',
      where: {
        email: {
          equals: email,
        },
      },
      //limit: 1,
    })
    if (find.totalDocs === 0) {
      try {
        await payload.create({
          collection: 'customers',
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        })
        return { success: true }
      } catch (error) {
        console.log('Error creating account:', error)
        return { success: false, error: 'Impossible de créer ce compte' }
      }
    } else {
      return { success: false, error: 'Un compte avec cet email existe déjà' }
    }
  } catch (error) {
    console.log('Error finding account:', error)
    return { success: false, error: 'Une erreur est survenue' }
  }
}
