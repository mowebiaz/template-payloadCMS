import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const url = getServerSideURL()

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 0,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs.map(({ slug, updatedAt }) => ({
          loc: `${url}/posts/${slug}`,
          lastmod: updatedAt || dateFallback,
        }))
      : []

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      sitemap
        .map(
          ({ loc, lastmod }) =>
            `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`,
        )
        .join('') +
      `</urlset>`

    return xml
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const xml = await getPostsSitemap()
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
