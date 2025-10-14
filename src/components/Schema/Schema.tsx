import type { Post, Media } from '@/payload-types'

export const articleSchema = (props: Post) => {
  //const image = props.meta?.image as Media | undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    datePublished: new Date(props?.createdAt).toISOString(),
    dateModified: new Date(props?.updatedAt).toISOString(),
    /* à revoir */
    //image: [`${monchemindeblob}/${image?.filename}`],
    author: {
      '@type': 'Person',
      name: 'John Doe',
      sameAs: ['https://www.johndoe.com', 'https://www.twitter.com/johndoe'],
    },
  }
}

interface JsonLdImageObject {
  '@context': 'https://schema.org'
  '@type': 'ImageObject'
  contentUrl?: string
  creditText?: string
  creator?: {
    '@type': 'Person'
    name: string
  }
}

type MediaForSchema = Pick<Media, 'creditText' | 'photographe' | 'filename'>

export const imageSchema = (media: MediaForSchema): JsonLdImageObject => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    //'contentUrl': `${monchemindeblob}/${image?.filename}`,
    ...(media.creditText && { creditText: media.creditText }),
    ...(media.photographe && {
      creator: { '@type': 'Person', name: media.photographe },
    }),
    // ...(media.filename && { contentUrl: `${BLOB_BASE}/${media.filename}` }),
  }
}
