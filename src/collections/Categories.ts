import type { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'
import user from './Users/access/user'


//import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: user,
    update: user,
    delete: user,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    //...slugField(),
  ],
}