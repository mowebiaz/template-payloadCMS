import {GlobalConfig} from 'payload'

export const Logos: GlobalConfig = {
  slug: 'logos',
  admin: {
    group: 'Logo et icônes',
  },
  fields: [
    {
      name: 'lightModeIcon',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'lightModeLogo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'darkModeIcon',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'darkModeLogo',
      type: 'upload',
      relationTo: 'media'
    },
  ]
}