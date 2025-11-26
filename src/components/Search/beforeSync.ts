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
import { ContentWithMedia } from '@/payload-types'

export const beforeSyncWithSearch: BeforeSync = async ({
  req,
  originalDoc,
  searchDoc,
}) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc
  const { slug, id, title, content, categories, coverImage, meta } = originalDoc

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
    coverImage,
    categories: [],
    meta: { ...meta, description: meta?.description },
    content: plaintext,
    excerpt:
      collection === 'posts'
        ? plaintext
        : collection === 'pages'
          ? pageText.join(' ')
          : '',
  }

    if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
