'use client'

import { useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { logout } from '../actions/logout'

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsLoading(true)
    setError(null)

    const result = await logout()
    setIsLoading(false)

    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <>
      {error && <p>{error}</p>}
      <button
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          'Déconnexion...'
        ) : (
          <div>
            <LuLogOut size={24} />
            <p>Se déconnecter</p>
          </div>
        )}
      </button>
    </>
  )
}
