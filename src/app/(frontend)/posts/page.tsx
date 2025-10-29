import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { PageRange } from '@/components/Pagination/PageRange'
import { Pagination } from '@/components/Pagination/Pagination'

export const postPerPage = 6

export default async function Posts() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const posts = await payload.find({
    collection: 'posts',
    overrideAccess: Boolean(user),
    draft: Boolean(user),
    depth: 1,
    limit: postPerPage,
    select: {
      title: true,
      slug: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
      id: true,
      coverImage: true,
      meta: true,
    },
  })

  return (
    <main>
      <h1>Tous les Posts</h1>
      <PageRange
        collection="posts"
        currentPage={posts.page}
        limit={posts.limit}
        totalDocs={posts.totalDocs}
      />
      <ArticleCardContainer posts={posts.docs} />
      {posts.totalPages > 1 && posts.page && (
        <Pagination
          page={posts.page}
          totalPages={posts.totalPages}
        />
      )}

      {/*       <p>Nombre de posts: {posts.totalDocs}</p>
      <p>Page actuelle: {posts.page}</p>
      <p>Nombre de pages: {posts.totalPages}</p>
      <p>Nombre de posts par page: {posts.limit}</p>
      <p>
        Nombre de posts restants:{' '}
        {posts.totalDocs - (posts.page - 1) * posts.limit}
      </p>
      <p>Nombre de posts affichés: {posts.docs.length}</p>
      <p>Nombre de posts filtrés: {posts.totalDocs - posts.docs.length}</p>
      <p>Nombre de posts triés: {posts.totalDocs}</p>
      <p>Nombre de posts non triés: {posts.docs.length}</p>
      <p>
        Nombre de posts uniques:{' '}
        {new Set(posts.docs.map((post) => post.slug)).size}
      </p>
      <p>
        Nombre de posts dupliqués:{' '}
        {posts.docs.length - new Set(posts.docs.map((post) => post.slug)).size}
      </p> */}
    </main>
  )
}
