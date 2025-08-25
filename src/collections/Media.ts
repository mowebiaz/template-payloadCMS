import type { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
  },
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
      },
    },
    {
      name: 'creditText',
      type: 'text',
      admin: {
        description: 'Credit for the image, e.g. source',
        placeholder: 'Image générée avec Midjourney',
      },
    },
    {
      name: 'photographe',
      type: 'text',
      admin: {
        description: "Nom du photographe ou de l'illustrateur",
        placeholder: 'Morgane Couvet',
      },
    },
  ],
  upload: {
    formatOptions: {
      format: 'webp',
    },
    mimeTypes: ['image/*'],
    //staticDir: 'media',

    // from payload v3.51.0
    //imageSizes: [{ name: 'small', fit: 'cover', width: 400, height: 400 }],
    //adminThumbnail: 'small',
    //adminThumbnail: ({doc}) : string => `https://google.com/path/to/file/${doc.filename}`,
  },
}
