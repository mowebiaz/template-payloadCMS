import { Post } from '@/payload-types'
import { ContentWithMediaBlock } from './ContentWithMedia/Component'
import { TableOfContents } from './TableOfContent/Component'

const blockComponents = {
  tableOfContents: TableOfContents,
  contentWithMedia: ContentWithMediaBlock,
}

export const RenderBlocks: React.FC<{ blocks: Post['BlockTest'] }> = (
  props,
) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer/>
                </div>
              )
            }
            return null
          }
        })}
      </>
    )
  }

  return null
}
