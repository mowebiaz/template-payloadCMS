import type { StaticImageData } from 'next/image'
import { RichText } from '@/components/RichText/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import './MediaBlock.scss'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={['mediablock', className, { container: enableGutter }]
        .filter(Boolean)
        .join(' ')}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={imgClassName}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={[
            captionClassName,
            {
              container: !disableInnerContainer,
            },
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <RichText data={caption} />
        </div>
      )}
    </div>
  )
}
