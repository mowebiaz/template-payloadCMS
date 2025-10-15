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
  const { title, content, slug } = originalDoc as {
    title: string
    content: SerializedEditorState
    slug: string
  }

  // if many fields named "content"
  // make a switch statement as it grows in complexity
  const pageText: string[] = []

  const data: SerializedEditorState | null = content ?? null

  const converters = {
    blocks: {
      contentWithMedia: ({
        node,
      }: {
        node: { fields?: { content?: SerializedEditorState | null } }
      }) => {
        const inner = node?.fields?.content
        return inner ? convertLexicalToPlaintext({ data: inner }) : ''
      },
    },
  }

  const plaintext = data
    ? convertLexicalToPlaintext({
        // @ts-expect-error: converters type is not compatible but required for custom block handling
        converters,
        data,
      })
    : ''

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title,
    slug,
    excerpt:
      collection === 'posts'
        ? plaintext
        : collection === 'pages'
          ? pageText.join(' ')
          : '',
  }

  return modifiedDoc
}
