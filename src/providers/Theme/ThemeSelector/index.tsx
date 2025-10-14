'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '../ThemeProvider'
import type { Theme } from '../constants'
import './ThemeSelector.scss'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  // État visuel du toggle. On se cale sur le thème effectif (Provider ou data-theme)
  const [isDark, setIsDark] = useState<boolean | null>(null)

  useEffect(() => {
    // 1) si le Provider connaît déjà le thème, on l’utilise
    if (theme) {
      setIsDark(theme === 'dark')
      return
    }
    // 2) sinon, on lit l’attribut déjà posé par InitTheme (aucun accès SSR)
    if (typeof document !== 'undefined') {
      const current = document.documentElement.getAttribute('data-theme') as Theme | null
      if (current === 'dark' || current === 'light') setIsDark(current === 'dark')
    }
  }, [theme])

  // Pendant la toute première frame, on évite un “saut” visuel
  if (isDark === null) {
    return (
      <button
        className="theme-toggle theme-toggle--loading"
        aria-label="Changer le thème"
        disabled
      />
    )
  }

  const nextTheme: Theme = isDark ? 'light' : 'dark'

  const handleToggle = () => {
    setTheme(nextTheme)        // écrit localStorage + data-theme via le Provider
    setIsDark(!isDark)
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      role="switch"
      aria-checked={isDark}
      aria-label={`Passer en thème ${nextTheme}`}
      title={`Passer en thème ${nextTheme}`}
      onClick={handleToggle}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
