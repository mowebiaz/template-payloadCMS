import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import editor from './Users/access/editor'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    readVersions: editor,
    read: ({ req }) => {
      if (req.user && req.user?.collection === 'users') return true
      return {
        or: [
          {
            _status: { equals: 'published' },
          },
          {
            _status: { exists: false },
          },
        ],
      }
    },
  },

  admin: {
    meta: {
      titleSuffix: ' - blog',
      title: 'mon blog',
    },
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
    useAsTitle: 'title',
    //hideAPIURL: true,
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
      /*       admin: {
        className: 'title-field',
        style: {
          backgroundColor: 'red',

        }
      }, */
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
        },*/
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(),
          ...defaultFeatures.filter((feature) => !['inlineCode'].includes(feature.key))  
          //...defaultFeatures,
        ],
      }),
    },
  ],
}
