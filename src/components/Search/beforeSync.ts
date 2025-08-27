import { ContentWithMedia } from '@/payload-types'
import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  convertLexicalToPlaintext,
  PlaintextConverter,
} from '@payloadcms/richtext-lexical/plaintext'

export const beforeSyncWithSearch: BeforeSync = async ({
  originalDoc,
  searchDoc,
}) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc
  const { title, content, slug } = originalDoc

  // if many fields named "content"
  // make a switch statement as it grows in complexity
  const pageText: string[] = []

  if (collection === 'pages') {
    const { content: pageBlocks } = originalDoc as Page
    pageBlocks?.forEach((block) => {
      if (block.blockType === 'contentWithMedia' && block.content) {
        pageText.push(convertLexicalToPlaintext({ data: block.content }))
      }
    })
  }

  const data: SerializedEditorState = content

  const converters: PlaintextConverter<
    DefaultNodeTypes | SerializedBlockNode<ContentWithMedia>
  > = {
    blocks: {
      contentWithMedia: ({ node }) => {
        return convertLexicalToPlaintext({ data: node.fields.content! })
      },
    },
  }

  const plaintext = convertLexicalToPlaintext({
    //@ts-expect-error
    converters,
    data,
  })

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title,
    slug,
    excerpt: collection === 'posts' ? plaintext: collection === 'pages' ? pageText.join(' ') : '',

  }

  return modifiedDoc
}
