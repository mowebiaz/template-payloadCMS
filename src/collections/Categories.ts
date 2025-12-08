import type { CollectionConfig } from 'payload'
import { slugField } from '@/components/Admin/Fields/slug/slugField'
import { anyone } from './Users/access/anyone'
import editor from './Users/access/editor'
import user from './Users/access/user'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: user,
    update: editor,
    delete: editor,
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
    ...slugField(),
  ],
}
