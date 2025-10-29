import type { Media, User } from '@/payload-types'
import Image from 'next/image'

function isMedia(v: unknown): v is Media {
  return v != null && typeof v === 'object' && 'url' in v
}

const Avatar = ({ user }: { user: User }) => {
  const value = user?.avatar
  const hasMedia = isMedia(value)

  const src = hasMedia && value.url ? value.url : '/avatar-default.svg'
  const alt = hasMedia && value.alt ? value.alt : (user?.email ?? 'avatar')

  return (
    <Image
      style={{ borderRadius: '50%' }}
      src={src}
      alt={alt}
      height={25}
      width={25}
    />
  )
}

export default Avatar
