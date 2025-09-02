import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="not-found">
      <h1>404</h1>
      <h2>Ce post n&apos;existe pas</h2>
      <p>
        Retourner à l&apos;
        <Link href="/">accueil</Link>
      </p>
    </main>
  )
}
