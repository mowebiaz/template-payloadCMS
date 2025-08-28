import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import path from 'path'
import { fileURLToPath } from 'url'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { Media } from './collections/Media'
import { Users } from './collections/Users/config'
import { Posts } from './collections/Posts/Posts'
import { beforeSyncWithSearch } from './components/Search/beforeSync'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    //avatar: 'default',
    //avatar: 'gravatar',
    avatar: {
      Component: {
        path: '@/components/Avatar.tsx',
      },
    },
    dateFormat: 'dd/MM/yyyy',
    meta: {
      titleSuffix: ' - Mon application Payload',
      title: 'blanck payload',
      description: 'this is exemple for educational purpose only',
      icons: [
        {
          url: '/logo3_sombre.svg',
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
        },
        {
          url: '/logo3_vert.svg',
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    /*importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,*/
  },

  // Internationalization configuration
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { fr, en },
  },

  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Posts, Media, Users],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Whichever Database Adapter you're using should go here
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_URL || ''],
  csrf: ['http://localhost:3000', process.env.NEXT_PUBLIC_URL || ''],

  upload: {
    //whatever I upload across my entire payload projet to 5 million bytes
    limits: {
      fileSize: 5000000,
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Mowebiaz de Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,

  hooks: {
    afterError: [
      (error) => {
        console.error('An error occurred:', error)
      },
    ],
  },

  plugins: [
    seoPlugin({
      /*     collections: ['posts'],
    uploadsCollection: 'media', */
      generateTitle: ({ doc }) => doc.title,
      //generateDescription: ({doc}) => doc.excerpt,
      generateDescription: ({ doc }) => doc.plaintext,
      generateURL: ({ doc, collectionSlug }) =>
        `http://localhost:3000/${collectionSlug}/${doc?.slug}`,
      /*     tabbedUI: true,
    fields: ({defaultFields}) => [
      ...defaultFields,
      {name: 'canonicalURL', type: 'text'},
    ] */
    }),
    searchPlugin({
      collections: ['posts'],
      localize: false,
      defaultPriorities: { posts: 20 },
      searchOverrides: {
        slug: 'search-results',
        labels: {
          singular: 'Search Result',
          plural: 'Search Results',
        },
        admin: {
          group: 'Search',
        },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: 'excerpt', type: 'textarea' },
          { name: 'slug', type: 'text' },
        ],
      },
      beforeSync: beforeSyncWithSearch,
      syncDrafts: false, // default is false
      deleteDrafts: true, // default is true
      reindexBatchSize: 50,
    }),
  ],

  // To make documents created before enabling draft mode visible in the admin field
  /*   onInit: async (payload) => {
    await payload.update({
      collection: 'posts',
      where: {},
      data: {_status: 'published'}
    })
  }, */
})
