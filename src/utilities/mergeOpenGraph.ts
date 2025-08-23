import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'This is an extension of the Payload blanck template',
  title: 'BlanckPayload',
  siteName: 'Blanck Payload',
  images: [
    {
      url: `${getServerSideURL()}/logo3_sombre.svg`,
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
