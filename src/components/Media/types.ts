import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media - objet complet renvoyé par Payload pour un fichier (avec url, alt, mimeType, width, height, éventuellement les tailles, etc.).
  size?: string // for NextImage only
  src?: StaticImageData // for static media: import logo from '@/public/logo.png' + <Media src={logo} alt="Logo" priority />
  videoClassName?: string
}

