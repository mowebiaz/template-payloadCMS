import type { ToCProps as TableOfContentsProps, ContentWithMedia as ContentWithMediaProps, MediaBlock as MediaBlockProps } from '@/payload-types'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { internalDocToHref } from '@/components/RichText/converters/internalLink'
import { ContentWithMediaBlock } from '@/blocks/ContentWithMedia/Component'
import { TableOfContents } from '@/blocks/TableOfContent/Component'
import { textConverter } from './textConverter'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<TableOfContentsProps | ContentWithMediaProps | MediaBlockProps>


export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...textConverter,
  blocks: {
    contentWithMedia: ({node}) => <ContentWithMediaBlock {...node.fields}/>,
    tableOfContents: ({node}) => <TableOfContents {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        {...node.fields}
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
  }
})