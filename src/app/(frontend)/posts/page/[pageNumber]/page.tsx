import type { Metadata } from 'next/types'
import { PageRange } from '@/components/Pagination/PageRange'
import { Pagination } from '@/components/Pagination/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { notFound } from 'next/navigation'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { postPerPage } from '../../page'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1)
    notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: postPerPage,
    page: sanitizedPageNumber,
    overrideAccess: Boolean(user),
    draft: Boolean(user),
  })

  if (posts.totalPages > 0 && sanitizedPageNumber > posts.totalPages) {
    //notFound()
    return (
      <h1>Vous avez vu tous les articles disponibles pour cette requête</h1>
    )
  }

  return (
    <main>
      <h1>Posts</h1>

      <PageRange
        collection="posts"
        currentPage={posts.page}
        limit={posts.limit}
        totalDocs={posts.totalDocs}
      />

      <ArticleCardContainer posts={posts.docs} />

      <div>
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination
            page={posts.page}
            totalPages={posts.totalPages}
          />
        )}
      </div>
    </main>
  )
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / postPerPage)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
