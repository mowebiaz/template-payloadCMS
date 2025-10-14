import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { RichText } from '@/components/RichText/RichText'
import { format } from 'date-fns'
import Image from 'next/image'
import { headers as getHeaders } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { articleSchema, imageSchema } from '@/components/Schema/Schema'
import type { Media, Post } from '@/payload-types'
import Script from 'next/script'
import { Redirects } from '@/components/Redirects/Redirects'
import { RelatedPosts } from '@/components/RelatedPosts/RelatedPosts'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    select: { slug: true },
  })

  /*    const params = posts.docs.map(({ slug }) => {
    //console.log(typeof slug, slug)
    return { slug } 

  }) */

  const params = posts.docs
    .filter((doc) => typeof doc.slug === 'string')
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = { params: Promise<{ slug?: string }> }

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  // check if there is no page to return.
  // If there isn't, it check if there is a redirect or not.
  // if not, return the not found page
  if (!post) {
    return <Redirects url={url} />
  }

  const schema = [
    articleSchema(post),
    post.meta?.image && imageSchema(post?.meta.image as Media),
  ].filter(Boolean)

  return (
    <>
      {/* for valid page that we want to redirect */}
      <Redirects
        url={url}
        disableNotFound
      />

      <Script
        id="schema-script"
        type={'application/ld+json'}
        strategy={'lazyOnload'}
      >
        {JSON.stringify(schema)}
      </Script>
      <main>
        {draft && <LivePreviewListener />}

        <section>
          <h1>{post.title}</h1>

          {post.coverImage &&
          typeof post.coverImage === 'object' &&
          post.coverImage.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || 'Cover Image'}
              width={600}
              height={400}
            />
          ) : (
            <p>No cover image available</p>
          )}

          {post.content && <RichText data={post.content} />}
          {/* <RenderBlocks blocks={post.BlockTest} /> */}
          {/* {post.content && <GenerateHtml data={post.content} />} */}
        </section>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section>
            <h2>Related posts</h2>

            <RelatedPosts
              docs={post.relatedPosts.filter(
                (post) => typeof post === 'object',
              )}
            />
          </section>
        )}

        <p>Status: {post._status}</p>
        <p>
          posts liés:{' '}
          {post.relatedPosts && post.relatedPosts.length > 0
            ? post.relatedPosts.length
            : 'none'}
        </p>
        <p>Crée le: {format(new Date(post.createdAt), 'dd/MM/yyyy')}</p>
        <p>Updated at: {format(new Date(post.updatedAt), 'dd/MM/yyyy')}</p>
        <p>Draft: {draft ? 'Yes' : 'No'}</p>
        <p>Draft Mode: {draft ? 'Enabled' : 'Disabled'}</p>
      </main>
    </>
  )
}

// the name "generateMetadata" is required
export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const headers = await getHeaders()

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const result = await payload.find({
    collection: 'posts',
    overrideAccess: Boolean(user),
    draft: Boolean(user),
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
