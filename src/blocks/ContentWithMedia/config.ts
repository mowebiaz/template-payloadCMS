import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  interfaceName: 'ContentWithMedia',
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  imageURL:
    'https://cdn.pixabay.com/photo/2021/02/27/06/08/lines-6053765_1280.png',
  imageAltText: 'bloc avec une image et du texte',
  fields: [
    {
      type: 'richText',
      name: 'content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature({ applyToFocusedEditor: true }),
        ],
      }),
    },
    {
      type: 'upload',
      name: 'imageBlock',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'textPosition',
      options: ['Left', 'Right'],
      defaultValue: 'Left',
    },
  ],
}
