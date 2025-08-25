import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    limit: 0,
    where: {},
  })

  const url = getServerSideURL()
/*   const staticPages = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ] */

  return [
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
/*     ...staticPages.map((page) => ({
      url: `${url}${page}`,
      lastModified: new Date(),
    })), */
  ]
}
