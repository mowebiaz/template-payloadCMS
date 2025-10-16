import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const protectRoles: FieldHook<{ id: string } & User> = async ({
  req,
  data,
}) => {
  const { totalDocs } = await req.payload.count({ collection: 'users' })
  const isFirstUser = totalDocs === 0

  if (isFirstUser) {
    const roles = new Set(data?.roles || [])
    roles.add('admin')
    roles.add('user')
    return [...roles]
  }

  const isAdmin = req.user?.roles?.includes('admin')

  if (!isAdmin) {
    return ['user']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user') // Ensure 'user' role is always included
  return [...userRoles.values()]
}
