import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  // ajouter les autorisations
 // par exemple pour les drafts

  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })
        return path
      },
    },
  },

  versions: {
    drafts: {
      autosave: { interval: 100 },
      //schedulePublish: true,
      //validate: true,
    },
    maxPerDoc: 50,
  },

  /*   defaultPopulate: {
    title: true,
    slug: true,
  }, */
  fields: [
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Image de couverture du post',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',

      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({
        /*         admin: {
          //hideInsertParagraphAtEnd: true,
          placeholder: 'Write your post content here...',
        },
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(),
          ...defaultFeatures,
        ], */
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            //BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            // TreeViewFeature(), pour le code
          ]
        },
      }),
    },
  ],
}
