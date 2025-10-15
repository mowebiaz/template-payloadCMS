import type { Payload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'

export const Logo = async ({payload}: {payload: Payload}) => {
  const logos = await payload.findGlobal({
    slug: 'logos'
  })

  const lightModeLogo = logos.lightModeLogo as Media
  const darkModeLogo = logos.darkModeLogo as Media

  return <>
    <Image
      src={lightModeLogo.url || `/logo3_sombre.svg`}
      alt={lightModeLogo.alt}
      width={lightModeLogo.width!}
      height={lightModeLogo.height!}
      className={'lightMode'}
    />
    <Image
      src={darkModeLogo.url || `/logo3_vert.svg`}
      alt={darkModeLogo.alt}
      width={darkModeLogo.width!}
      height={darkModeLogo.height!}
      className={'darkMode'}
    />
  </>

}