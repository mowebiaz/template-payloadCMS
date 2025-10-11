'use client'

import { useEffect } from 'react'
import { useTheme } from '@/providers/Theme/ThemeProvider'

const ICON = {
  light: '/logo3_sombre.svg',
  dark: '/logo3_vert.svg',
}

// utilitaire : crée ou met à jour un <link>
function upsertLink(id: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(`link#${id}`)
  if (!el) {
    el = document.createElement('link')
    el.id = id
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

function applyFavicon(theme: 'light' | 'dark') {
  const href = `${ICON[theme]}?v=${theme}` // cache-busting simple
  upsertLink('favicon-svg', { rel: 'icon', type: 'image/svg+xml', href })
  // optionnels / redondants selon tes besoins :
  upsertLink('favicon-ico', { rel: 'shortcut icon', href })
  // si tu as des PNG en plus :
  // upsertLink('favicon-32', { rel: 'icon', sizes: '32x32', href: `/favicons/favicon-${theme}-32.png` })
  // upsertLink('favicon-16', { rel: 'icon', sizes: '16x16', href: `/favicons/favicon-${theme}-16.png` })
}

export default function Favicon() {
  const { theme } = useTheme() 
  // ex : 'light' | 'dark' | null (null = auto)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    const compute = (): 'light' | 'dark' => {
      if (theme === 'light' || theme === 'dark') return theme
      // auto => on suit le système
      return mql.matches ? 'dark' : 'light'
    }

    // appliquer au mount + à chaque changement de theme
    applyFavicon(compute())

    // si 'auto', écouter les changements système
    if (theme == null) {
      const handler = (e: MediaQueryListEvent) => applyFavicon(e.matches ? 'dark' : 'light')
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [theme])

  return null
}
