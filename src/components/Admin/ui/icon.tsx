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
      //src={`${moncheminblob}/${lightModeIcon.filename}`}
      src={lightModeIcon.url || '/logo3_sombre.svg'}
      alt={lightModeIcon.alt}
      width={lightModeIcon.width!}
      height={lightModeIcon.height!}
      className={'lightMode'}
    />
    <Image
      src={darkModeIcon.url || '/logo3_vert.svg'}
      alt={darkModeIcon.alt}
      width={darkModeIcon.width!}
      height={darkModeIcon.height!}
      className={'darkMode'}
    />
  </>

}