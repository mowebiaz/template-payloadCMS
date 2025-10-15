import type { Post } from '@/payload-types'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

export const Redirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()
  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    // 1) URL directe
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    // 2) Référence (id ou objet peuplé)
    let redirectUrl: string | undefined
    const ref = redirectItem.to?.reference

    if (ref) {
      const collection = ref.relationTo 

      if (typeof ref.value === 'string') {
        // value = id → on va chercher le doc pour récupérer le slug
        const document = (await getCachedDocument(collection, ref.value)()) as Post | { slug?: string } | null
        const slug = document?.slug
        redirectUrl = `/${collection}${slug ? `/${slug}` : ''}`
      } else if (ref.value && typeof ref.value === 'object') {
        // value = objet peuplé → slug disponible
        const slug = (ref.value as { slug?: string })?.slug
        redirectUrl = `/${collection}${slug ? `/${slug}` : ''}`
      }
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null
  return notFound()
}