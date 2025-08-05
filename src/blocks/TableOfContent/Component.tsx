import { ToCProps } from '@/payload-types'
import Link from 'next/link'

export function TableOfContents(block: ToCProps) {
  return (
    <section>
      <div>
        {block.Content?.map((content) => (
          <Link
            href={`/${content.link}`}
            key={content.id}
          >
            {content.header}
          </Link>
        ))}
      </div>
    </section>
  )
}
