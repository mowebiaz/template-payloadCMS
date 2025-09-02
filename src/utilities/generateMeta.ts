import type { Metadata } from 'next'
import type { Post, Config, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/logo3_sombre.svg'

  if (image && typeof image === 'object' && 'url' in image) {
    // poru définir la taille de l'image og
    const ogURL = image.sizes?.small?.url
    url = ogURL ? serverUrl + ogURL : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Post>
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title
    ? doc.meta.title
    : doc?.title
      ? doc.title
      : 'Blanck Payload'
  const description = doc?.meta?.description ? doc.meta.description : ''
  const url = doc?.meta?.canonicalUrl
    ? doc.meta.canonicalUrl
    : Array.isArray(doc?.slug)
      ? doc.slug.join('/')
      : '/'


  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url,
    }),
    alternates: { canonical: url },

    /*     openGraph: {
      title,
      description,
      type: 'article',
      url: `${getServerSideURL()}/posts/${doc?.slug}`,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    }, */
    /*     twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }, */
    //alternates: { canonical: `${getServerSideURL()}/posts/${doc?.slug}`
  }
}
