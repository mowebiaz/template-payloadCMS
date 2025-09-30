import { Search } from '@/components/Search/Search'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { CardPostData } from '@/components/ArticleCard/ArticleCard'

type Args = {
  searchParams: Promise<{ q: string }>
}

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'search-results',
    depth: 1,
    limit: 6,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      doc: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { excerpt: { like: query } },
              { slug: { like: query } },
            ],
          },
        }
      : {}),
  })

  return (
    <div>
      <div>
        <div>
          <h1>Search</h1>
          <div>
            <Search />
          </div>
        </div>
      </div>
      <div>
        {posts.totalDocs > 0 ? (
          <ArticleCardContainer posts={posts.docs as CardPostData[]} />
        ) : (
          <div>No result found</div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'blog - search',
    description: 'Search page',
  }
}
