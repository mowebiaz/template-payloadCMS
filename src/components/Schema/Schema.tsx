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

export const imageSchema = (media: Media): Record<string, any> => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    //'contentUrl': `${monchemindeblob}/${image?.filename}`,
  }

  if (media.creditText) {
    schema.creditText = media.creditText
  }

  if (media.photographe) {
    schema.creator = {
      '@type': 'Person',
      name: media.photographe,
    }
  }

  return schema
}
