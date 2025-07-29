import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  defaultPopulate: {
    slug: true,
    name: true,
  },
  fields: [
    /*{
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },*/
/*     {
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
    }, */
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
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
