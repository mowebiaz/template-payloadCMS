import { defaultColors, TextStateFeature } from '@payloadcms/richtext-lexical'

type TextState = NonNullable<Parameters<typeof TextStateFeature>[0]>['state']

export const textState: TextState = {
  color: {
    ...defaultColors.text,
    black: {
      label: 'Black',
      css: {
        color: '#000000',
      },
    },
  },
  background: {
    ...defaultColors.background,
    greenmw: {
      label: 'Green - MW',
      css: {
        'background-color': '#00ECAE',
      },
    },
  },
  size: {
    large: {
      label: 'Large text',
      css: {
        'font-size': 'large',
      },
    },
  },
  underline: {
    dashed: {
      label: 'Dashed',
      css: {
        'text-decoration': 'underline dashed',
      },
    },
  },
}
