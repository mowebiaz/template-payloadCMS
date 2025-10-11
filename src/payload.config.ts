import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig, PayloadRequest, TaskConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import path from 'path'
import { fileURLToPath } from 'url'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { Media } from './collections/Media'
import { Users } from './collections/Users/config'
import { Posts } from './collections/Posts/Posts'
import { beforeSyncWithSearch } from './components/Search/beforeSync'
import { resendAdapter } from '@payloadcms/email-resend'
import { revalidateRedirects } from './collections/hooks/revalidateRedirects'
import { Logos } from './globals/Logos'
import { Categories } from './collections/Categories'
import { schedulePublish } from './utilities/jobs/schedulePublish'

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
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 1080 },
      ],
    },
    components: {
      /*       logout: {
        //Button: '@/components/Admin/ui/Logout#Logout',
        Button: {
          path: '@/components/Admin/ui/logout.tsx',
          exportName: 'Logout',
        },
      }, */
      beforeNavLinks: [],
      afterNavLinks: [],
      beforeDashboard: [
        {
          path: '@/components/Admin/ui/beforeDashboard.tsx',
          exportName: 'Welcome',
        },
      ],
      afterDashboard: [
        {
          path: '@/components/Admin/ui/afterDashboard.tsx',
          exportName: 'Outro',
        },
      ],
      beforeLogin: [
        {
          path: '@/components/Admin/ui/beforeLogin.tsx',
          exportName: 'LinkToHome',
        },
      ],
      afterLogin: [
        {
          path: '@/components/Admin/ui/afterLogin.tsx',
          exportName: 'LoginInstruction',
        },
      ],
      actions: [
        { path: '@/components/Admin/ui/logout.tsx', exportName: 'Logout' },
      ],
      header: [
        {
          path: '@/components/Admin/ui/header.tsx',
          exportName: 'Header',
        },
      ],
      /*       graphics: {
        Logo: {
          path: '@/components/Admin/ui/logo.tsx',
          exportName: 'Logo',
        },
        Icon: {
          path: '@/components/Admin/ui/icon.tsx',
          exportName: 'Icon',
        },
      }, */
    },
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
  collections: [Posts, Media, Users, Categories],
  globals: [Logos],

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
    redirectsPlugin({
      collections: ['posts'],
      redirectTypes: ['301', '302'],
      overrides: {
        fields: ({ defaultFields }) => [
          {
            type: 'checkbox',
            name: 'active',
            defaultValue: true,
          },
          ...defaultFields,
        ],
        hooks: {
          afterChange: [revalidateRedirects],
        },
        admin: {
          group: 'Navigation',
        },
      },
      redirectTypeFieldOverride: {
        //label: 'Redirect Type (Overwrittent)',
        admin: { description: 'Choose the type of redirect to use' },
      },
    }),
  ],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }) => {
        if (req.user) return true
        return (
          `Bearer ${process.env.CRON_SECRET}` ===
          req.headers.get('Authorization')
        )
      },
    },
    tasks: [
      {
        slug: 'healthCheck',
        handler: async ({ req }) => {
          const results = {
            timestamp: new Date().toISOString(),
            errors: [] as string[],
            checks: {
              database: false,
              api: false,
            },
          }
          try {
            try {
              await req.payload.find({
                collection: 'users',
                limit: 1,
              })
              results.checks.database = true
            } catch (e) {
              await req.payload.sendEmail({
                to: process.env.EMAIL,
                html: `Health check failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
              })
              results.errors.push('Database check failed')
            }
            try {
              const serverUrl =
                process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
              const response = await fetch(`${serverUrl}/api/health`)
              if (response.ok) {
                results.checks.api = true
              } else {
                results.errors.push(
                  `API health check return ${response.status}`,
                )
                await req.payload.sendEmail({
                  to: process.env.EMAIL,
                  html: `Health check failed: API returned status ${response.status}`,
                })
              }
            } catch (e) {
              results.errors.push('API check failed')
            }
            const allHealthy = Object.values(results.checks).every(
              (check) => check,
            )
            if (!allHealthy) {
              req.payload.logger.error('Health check failed')
              await req.payload.sendEmail({
                to: process.env.EMAIL,
                html: `<h2>Health check failed</h2>`,
              })
            } else {
              req.payload.logger.info('All systems healthy')
            }
            return { output: results }
          } catch (e) {
            req.payload.logger.error('Health check error')
            throw e
          }
        },
        retries: 1,
      } as TaskConfig<'healthCheck'>,
      schedulePublish as TaskConfig<'schedulePublish'>,
    ],
  },

  // To make documents created before enabling draft mode visible in the admin field
  /*   onInit: async (payload) => {
    await payload.update({
      collection: 'posts',
      where: {},
      data: {_status: 'published'}
    })
  }, */
})
