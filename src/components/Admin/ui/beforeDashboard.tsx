import Link from "next/link"

export const Welcome = () => {
  return (
    <>
      <h2>Bienvenue sur votre dashboard</h2>
      <p>Cliquez sur une collection pour commencer</p>
              <Link
                href={'/posts'}
                target={'_blank'}
              >
                Voir tous les articles
              </Link>
    </>
  )
}
