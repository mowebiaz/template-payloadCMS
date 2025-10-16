import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import editor from './access/editor'
import user from './access/user'
import admin from './access/admin'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  defaultPopulate: {
    slug: true,
    avatar: true,
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      validate: (val) => Array.isArray(val) && val.every(Boolean) ? true : 'Invalid roles',
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },

    {
      name: 'lastName',
      type: 'text',
      //required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      //required: true,
    },
    // Email added by default
  ],
}
