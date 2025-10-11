import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'
import { PageRange } from '@/components/Pagination/PageRange'
import { Pagination } from '@/components/Pagination/Pagination'

export default async function Posts() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const posts = await payload.find({
    collection: 'posts',
    overrideAccess: Boolean(user),
    draft: Boolean(user),
    depth: 1,
    limit: 5,
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

 {/*      <p>Nombre de posts: {posts.totalDocs}</p>
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
      </p>
      <p>
        Nombre de posts avec des liens:{' '}
        {posts.docs.filter((post) => post.slug).length}
      </p>
      <p>
        Nombre de posts sans liens:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.slug).length}
      </p>
      <p>
        Nombre de posts avec des images:{' '}
        {posts.docs.filter((post) => post.image).length}
      </p>
      <p>
        Nombre de posts sans images:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.image).length}
      </p>
      <p>
        Nombre de posts avec des vidéos:{' '}
        {posts.docs.filter((post) => post.video).length}
      </p>
      <p>
        Nombre de posts sans vidéos:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.video).length}
      </p>
      <p>
        Nombre de posts avec des audios:{' '}
        {posts.docs.filter((post) => post.audio).length}
      </p>
      <p>
        Nombre de posts sans audios:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.audio).length}
      </p>
      <p>
        Nombre de posts avec des fichiers:{' '}
        {posts.docs.filter((post) => post.file).length}
      </p>
      <p>
        Nombre de posts sans fichiers:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.file).length}
      </p>
      <p>
        Nombre de posts avec des liens externes:{' '}
        {posts.docs.filter((post) => post.externalLink).length}
      </p>
      <p>
        Nombre de posts sans liens externes:{' '}
        {posts.docs.length -
          posts.docs.filter((post) => post.externalLink).length}
      </p>
      <p>
        Nombre de posts avec des liens internes:{' '}
        {posts.docs.filter((post) => post.internalLink).length}
      </p>
      <p>
        Nombre de posts sans liens internes:{' '}
        {posts.docs.length -
          posts.docs.filter((post) => post.internalLink).length}
      </p>
      <p>
        Nombre de posts avec des tags:{' '}
        {posts.docs.filter((post) => post.tags).length}
      </p>
      <p>
        Nombre de posts sans tags:{' '}
        {posts.docs.length - posts.docs.filter((post) => post.tags).length}
      </p> */}
    </main>
  )
}
