import type { Payload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'

export const Icon = async ({payload}: {payload: Payload}) => {
  const icons = await payload.findGlobal({
    slug: 'logos'
  })

  const lightModeIcon = icons.lightModeIcon as Media
  const darkModeIcon = icons.darkModeIcon as Media

  return <>
    <Image
      src={`${moncheminblob}/${lightModeIcon.filename}`}
      alt={lightModeIcon.alt}
      width={lightModeIcon.width!}
      height={lightModeIcon.height!}
      className={'lightMode'}
    />
    <Image
      src={`${moncheminblob}/${darkModeIcon.filename}`}
      alt={darkModeIcon.alt}
      width={darkModeIcon.width!}
      height={darkModeIcon.height!}
      className={'darkMode'}
    />
  </>

}