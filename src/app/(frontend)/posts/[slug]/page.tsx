import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { RichText } from '@/components/RichText/RichText'
import { format } from 'date-fns'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'
import { RenderBlocks } from '@/blocks'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { articleSchema, imageSchema } from '@/components/Schema/Schema'
import type { Media, Post } from '@/payload-types'
import Script from 'next/script'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    //draft: false,
    //overrideAccess: false,
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
  //const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })
  const schema = [
    articleSchema(post),
    post.meta?.image && imageSchema(post.meta.image as Media),
  ].filter(Boolean)
  //const schema = [imageSchema(post.meta?.image as Media), articleSchema(post)]

  if (!post) {
    return <div>Post not found</div>
  }

  if (!slug) {
    return <div>Slug is required</div>
  }

  return (
    <>
      <Script
        id="schema-script"
        type={'application/ld+json'}
        strategy={'lazyOnload'}
      >
        {JSON.stringify(schema)}
      </Script>
      <div>
        {draft && <LivePreviewListener />}

        <h1>{post.title}</h1>
        <p>Slug: {post.slug}</p>
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
        <RenderBlocks blocks={post.BlockTest} />

        <p>Status: {post._status}</p>
        <p>Crée le: {format(new Date(post.createdAt), 'dd/MM/yyyy')}</p>
        <p>Updated at: {format(new Date(post.updatedAt), 'dd/MM/yyyy')}</p>
        <p>Draft: {draft ? 'Yes' : 'No'}</p>
        <p>Draft Mode: {draft ? 'Enabled' : 'Disabled'}</p>
      </div>
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
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
