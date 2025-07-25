import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { RichText } from '@/components/RichText/RichText'

/* export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    //overrideAccess: false,
    limit: 10,
    select: { slug: true },
  }) 

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })
  return params
} */

type Args = { params: Promise<{ slug?: string }> }

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  //const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      {draft && <LivePreviewListener />}

      <h1>{post.title}</h1>
      {post.content && <RichText data={post.content} />}
      <p>Status: {post._status}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
      <p>Draft: {draft ? 'Yes' : 'No'}</p>
      <p>Draft Mode: {draft ? 'Enabled' : 'Disabled'}</p>
    </div>
  )
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    //overrideAccess: draft,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
