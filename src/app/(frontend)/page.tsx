import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href={'/posts'}>Tous les posts</Link>
      <Link href={'/search'}>Rechercher</Link>
      <Link href={'/contact'}>Contact</Link>
    </>
  )
}
