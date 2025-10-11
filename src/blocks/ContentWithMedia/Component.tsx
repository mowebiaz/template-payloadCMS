import { RichText } from '@/components/RichText/RichText'
import { ContentWithMedia } from '@/payload-types'
import Image from 'next/image'
import './ContentWithMedia.scss'

export function ContentWithMediaBlock(block: ContentWithMedia) {
  return (
    <div
      className={`content-with-media ${block.textPosition === 'Left' ? 'left' : 'right'}`}
    >
      {block.imageBlock && typeof block.imageBlock === 'object' && (
        <Image
          src={block.imageBlock.url || ''}
          alt={block.imageBlock.alt || ''}
          width={block.imageBlock.width || 640}
          height={block.imageBlock.height || 360}
        />
      )}

      {block.content && <RichText data={block.content} />}
    </div>
  )
}
