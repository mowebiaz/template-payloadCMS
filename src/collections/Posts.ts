import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import editor from './Users/access/editor'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { TableOfContent } from '@/blocks/TableOfContent/config'

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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Image de couverture du post',
      },
    },

    {
      name: 'content',
      type: 'richText',

      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({
        admin: {
          //hideInsertParagraphAtEnd: true,
          placeholder: 'Ecrivez votre article ici...',
        },
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(),
          //...defaultFeatures,
          ...defaultFeatures.filter(
            (feature) => !['inlineCode'].includes(feature.key),
          ),
          BlocksFeature({
            blocks: [ContentWithMedia, TableOfContent],
          })
        ],
      }),
    },
    {
      type: 'blocks',
      admin: {
        initCollapsed: true,
        isSortable: false,
      },
      blocks: [ContentWithMedia, TableOfContent],
      name: 'BlockTest',
      label: false,
      /*       labels: {
        singular: 'Content with Media Block',
        plural: 'Content with Media Blocks',
      }, */
      minRows: 1,
      maxRows: 20,
    },
  ],
}
