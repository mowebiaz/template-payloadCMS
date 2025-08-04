import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'nom',
    description: 'Media collection for storing images and their metadata',
    defaultColumns: ['nom', 'filename', 'alt'],
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
/*       admin: {
        position: 'sidebar',
      }, */
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Alternative text for the image, used for accessibility and SEO',
        //position: 'sidebar',
      },
    },
  ],
  upload: true,
}
