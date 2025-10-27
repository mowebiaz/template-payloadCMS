import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { TableOfContent } from '@/blocks/TableOfContent/config'
import { slugField } from '@/components/Admin/Fields/slug/slugField'
import { CustomBlockIcon } from '@/components/RichText/CustomBlockIcon'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import editor from '../Users/access/editor'
//import { afterErrorHook } from './hooks'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

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
          { _status: { exists: false } },
        ],
      }
    },
  },
  /*   defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    
  }, */

  trash: true,
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },

  admin: {
    //group: 'posts',
    groupBy: true,
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    useAsTitle: 'title',
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
    listSearchableFields: ['title', 'slug'],
    components: {
      beforeList: [
        {
          path: 'src/collections/Posts/components/beforeList.tsx',
          exportName: 'BeforeListContent',
        },
      ],
      afterList: [
        {
          path: 'src/collections/Posts/components/afterList.tsx',
          exportName: 'AfterListContent',
        },
      ],
      beforeListTable: [
        {
          path: 'src/collections/Posts/components/PostsByStatus.tsx',
          exportName: 'PostsByStatus',
        },
      ],
    },
    meta: {
      titleSuffix: ' - blog',
      title: 'mon blog',
    },
    defaultColumns: ['title', 'createdAt', 'updatedAt', '_status'],
    //useAsTitle: 'title',
    //hideAPIURL: true,
  },

  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
      //validate: false,
    },
    maxPerDoc: 100,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'content',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              label: 'Image de couverture du post',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Image de couverture du post',
                /*                 components: {
                  Label: {
                    path: 'src/components/Admin/Fields/Label.tsx',
                    exportName: 'CustomTextLabel',
                  }
                } */
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: "Résumé de l'article",
              },
            },
            {
              name: 'plaintext',
              type: 'text',
              required: true,
              admin: {
                description: "Texte brut de l'article, utilisé pour le SEO",
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
                features: ({ rootFeatures }) => [
                  ...rootFeatures,

                  FixedToolbarFeature({
                    customGroups: {
                      blocks: {
                        order: 100,
                        ChildComponent: CustomBlockIcon,
                      },
                      add: {
                        order: 90,
                        type: 'buttons',
                      },
                    },
                  }),

                  BlocksFeature({
                    blocks: [ContentWithMedia, TableOfContent],
                  }),
                ],

                /*features: ({ rootFeatures }) => {
                  console.log(
                    'FEATURE KEYS:',
                    rootFeatures.map((f) => f.key),
                  )
                  return rootFeatures
                }, */
              }),
            },
          ],
        },
        {
          label: 'Info',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'relatedPosts',
              type: 'relationship',

              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
              maxDepth: 3,
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
              hooks: {
                beforeChange: [
                  ({ siblingData, value }) => {
                    if (siblingData._status === 'published' && !value) {
                      return new Date()
                    }
                    return value
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
              /*               overrides: {
                label: 'Whatever you want',
              }, */
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              hooks: {
                beforeChange: [
                  async ({ data, value }) =>
                    !value ? `https://example.com/posts/${data?.slug}` : value,
                ],
              },
            },
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
  ],

  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
}
