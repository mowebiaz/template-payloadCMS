import { Search } from '@/components/Search/Search'
import { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'


type Args = {
  searchParams: Promise<{ q: string }>
}
 
export default async function SearchPage({
  searchParams: searchParamsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  const post = await payload.find({
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
            <Search/>
          </div>
        </div>
      </div>
      <div>
        {post.totalDocs > 0 ? (
          post.docs.map((doc) => {
            const slug = `/posts/${doc.slug}`
            return <Link href={slug!} key={doc.id}>{doc.title}</Link>
          })
        ) : <div>No result found</div> }
      </div>
    </div>
  )
}

export function generateMetadata() : Metadata {
  return {
    title: 'blog - search',
    description: 'Search page',
  }
}
