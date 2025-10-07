import { RichText } from '@/components/RichText/RichText'
import { ContentWithMedia } from '@/payload-types'
import Image from 'next/image'

export function ContentWithMediaBlock(block: ContentWithMedia) {
  if (block.textPosition === 'Left') {
    return (
      <section>
        <div>{block.content && <RichText data={block.content} />}</div>
        {block.imageBlock && typeof block.imageBlock === 'object' &&
        (
          <Image
            src={block.imageBlock.url || ''}
            alt={block.imageBlock.alt || ''}
            width={block.imageBlock.width || 640}
            height={block.imageBlock.height || 360}
          />
        )}
      </section>
    )
  } else if (block.textPosition === 'Right') {
    return (
      <section>
        {block.imageBlock && typeof block.imageBlock === 'object' &&
        (
          <Image
            src={block.imageBlock.url || ''}
            alt={block.imageBlock.alt || ''}
            width={block.imageBlock.width || 640}
            height={block.imageBlock.height || 360}
          />
        )}
        <div>{block.content && <RichText data={block.content} />}</div>
      </section>
    )
  }
}
