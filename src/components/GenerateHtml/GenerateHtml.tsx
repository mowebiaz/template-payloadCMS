import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import type { ContentWithMedia, Media } from '@/payload-types'
import {
  getPayloadPopulateFn,
  type SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import config from '@payload-config'

export const GenerateHtml = async ({
  data,
}: {
  data: SerializedEditorState
}) => {
  const payload = await getPayload({ config })
  const html = await convertLexicalToHTMLAsync({
    data,
    populate: await getPayloadPopulateFn({
      currentDepth: 0,
      depth: 1,
      payload,
    }),
    converters: ({ defaultConverters }) => ({
      ...defaultConverters,
      blocks: {
        contentWithMedia: async ({
          node,
        }: {
          node: SerializedBlockNode<ContentWithMedia>
        }) => {
          const richText =
            node.fields.content &&
            (await convertLexicalToHTMLAsync({ data: node.fields.content }))
          const image = node.fields.imageBlock as Media

          return `<div class="content-with-media">
      <div class="text">
        ${richText}
      </div>
      ${image?.url ? `<div class="image"><img src="${image.url}" alt="${image.alt || ''}" /></div>` : ''}
    </div>`
        },
      },
    }),
  })
  return html && <div dangerouslySetInnerHTML={{ __html: html }} />
}
