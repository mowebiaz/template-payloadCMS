'use client'

import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { getClientSideURL } from '@/utilities/getURL'
import './AdminBar.scss'

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar = () => {
  return (
    <PayloadAdminBar
      cmsURL={getClientSideURL()}
      adminPath="/admin"
      logo={<Title />}
      unstyled={true}
      classNames={{
        user: 'adminbar__user',
        logo: 'adminbar__logo',
        logout: 'adminbar__logout',
      }}
    />
  )
}
