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
      src={`${moncheminblob}/${lightModeLogo.filename}`}
      alt={lightModeLogo.alt}
      width={lightModeLogo.width!}
      height={lightModeLogo.height!}
      className={'lightMode'}
    />
    <Image
      src={`${moncheminblob}/${darkModeLogo.filename}`}
      alt={darkModeLogo.alt}
      width={darkModeLogo.width!}
      height={darkModeLogo.height!}
      className={'darkMode'}
    />
  </>

}