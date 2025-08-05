import { Block } from 'payload'

export const TableOfContent: Block = {
  slug: 'tableOfContents',
  interfaceName: 'ToCProps',
  fields: [
    {
      name: 'Content',
      type: 'array',
      fields: [
        {
          type: 'text',
          name: 'header',
        },
        {
          type: 'text',
          name: 'link',
        },
      ],
    },
  ],
}
