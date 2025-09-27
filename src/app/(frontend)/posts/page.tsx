import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { format } from 'date-fns'
import { headers as getHeaders } from 'next/headers'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { ArticleCardContainer } from '@/components/ArticleCardContainer/ArticleCardContainer'

export default async function Posts() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const posts = await payload.find({
    collection: 'posts',
    overrideAccess: Boolean(user),
    draft: Boolean(user),
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
    <>
      <h1>Tous les Posts</h1>
      <ArticleCardContainer posts={posts.docs} />
      <ul>
        {posts.docs.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <a href={`/posts/${post.slug}`}>lien vers le post</a>
            <p>Slug: {post.slug}</p>
            <p>Crée le: {format(new Date(post.createdAt), 'dd/MM/yyyy')}</p>
            <p>ID du post: {post.id}</p>
            <p>---------------------</p>
          </li>
        ))}
      </ul>
      <br></br>

      <br />
      <p>Nombre de posts: {posts.totalDocs}</p>
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
      </p>
    </>
  )
}
