import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
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
