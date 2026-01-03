'use client'

import { useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import { redirect } from 'next/navigation'
import { ForgotPassword } from '../../(account)/forgot-password/actions/forgot-password'
import { logout } from '../actions/logout'
import './ResetPasswordButton.scss'

export const ResetPasswordButton = ({ email }: { email: string }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await ForgotPassword({ email })
    setIsLoading(false)
    setIsClicked(true)
    await logout()
    redirect(
      `/login?message=${encodeURIComponent('La demande de réinitialisation de votre mot de passe a été envoyée à votre adresse e-mail')}`,
    )
  }

  return (
    <div>
      <button
        disabled={isClicked}
        className={`reset-password-button ${isClicked ? 'clicked' : ''}`}
        type='button'
        onClick={handleClick}
      >
        {!isClicked ? 'Modifier le mot de passe ?' : 'Demande envoyée !'}
        <LuLoader className={isLoading ? 'animate-spin' : ''} />
      </button>
      {isClicked && <div>
        <p>Vérifiez vos email pour plus d&apos;instructions</p>
        </div>}
    </div>
  )
}
