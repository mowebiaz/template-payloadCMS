import { headers as getHeaders } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { CategoryFilters } from '@/components/CategoryFilters/CategoryFilters'
import { PageRange } from '@/components/Pagination/PageRange'
import { Pagination } from '@/components/Pagination/Pagination'
import type { Category } from '@/payload-types'

export const revalidate = 600
const postPerPage = 6

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams?: Promise<{ category?: string }>
}

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { pageNumber } = await paramsPromise
  const searchParams = (await searchParamsPromise) || {}

  const categorySlug = searchParams.category || 'all'
  const sanitizedPageNumber = Number(pageNumber)

  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1)
    notFound()

  // Charger les catégories pour les filtres et pour résoudre le slug -> id
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 50,
    sort: 'title',
  })

  const categories = categoriesResult.docs as Category[]

  const activeCategory = categories.find((cat) => cat.slug === categorySlug)

  if (!activeCategory && categorySlug !== 'all') {
    notFound()
  }

  const where = {
    ...(categorySlug !== 'all' && activeCategory
      ? { categories: { equals: activeCategory.id } }
      : {}),
  }

  if (activeCategory) {
    // Relationship hasMany vers `categories` -> on filtre par id
    where.categories = {
      equals: activeCategory.id,
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: postPerPage,
    page: sanitizedPageNumber,
    where,
    overrideAccess: Boolean(user),
    draft: Boolean(user),
  })

  if (posts.totalPages > 0 && sanitizedPageNumber > posts.totalPages) {
    return (
      <h1>Vous avez vu tous les articles disponibles pour cette requête</h1>
    )
  }

  return (
    <main>
      <h1>Posts</h1>

      <CategoryFilters
        categories={categories}
        currentCategorySlug={categorySlug}
      />

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
            basePath="/posts"
            categorySlug={categorySlug !== 'all' ? categorySlug : undefined}
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
