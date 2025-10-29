import { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CardPostData } from '@/components/ArticleCard/ArticleCard'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { PageRange } from '@/components/Pagination/PageRange'
import { SearchPagination } from '@/components/Pagination/SearchPagination'
import { Search } from '@/components/Search/Search'

export default async function SearchPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const payload = await getPayload({ config: configPromise })
  const searchResults = await payload.find({
    collection: 'search-results',
    depth: 1,
    limit: 6,
    page: currentPage,
    pagination: true, // access to page, totalPages...
    select: {
      title: true,
      slug: true,
      excerpt: true,
      doc: true,
    },
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
    <main>
      <h1>Search</h1>
      <Search />
      {query && <h2>Résultats pour &quot;{query}&quot;</h2>}
      <PageRange
        collection="posts"
        limit={searchResults.limit}
        currentPage={searchResults.page}
        totalDocs={searchResults.totalDocs}
      />
      {searchResults.totalDocs > 0 ? (
        <ArticleCardContainer posts={searchResults.docs as CardPostData[]} />
      ) : (
        <div>No result found</div>
      )}
      {searchResults.totalPages > 1 && searchResults.page && (
        <SearchPagination totalPages={searchResults.totalPages} />
      )}
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'blog - search',
    description: 'Search page',
  }
}
