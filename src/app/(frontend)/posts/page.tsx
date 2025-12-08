import { redirect } from 'next/navigation'

type BlogRootProps = {
  searchParams?: Promise<{ category?: string }>
}

export default async function BlogRoot({
  searchParams: searchParamsPromise,
}: BlogRootProps) {
  const searchParams = (await searchParamsPromise) || {}
  const category = searchParams.category
  const qs = category ? `?category=${category}` : ''

  redirect(`/posts/page/1${qs}`)
}
