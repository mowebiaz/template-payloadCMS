import type { Media, User } from '@/payload-types'
import Image from 'next/image'

const Avatar = ({ user }: { user: User }) => {
  const avatar = user?.avatar as Media

  return (
    <Image
      style={{ borderRadius: '50%' }}
      src={avatar.url || '/avatar-default.svg'}
      alt={avatar.alt || ''}
      height={25}
      width={25}
    />
  )
}

export default Avatar
