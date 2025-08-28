'use client'

import { getClientSideURL } from '@/utilities/getURL'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={getClientSideURL()}
      //serverURL={process.env.NEXT_PUBLIC_SERVER_URL!}
    />
  )
}
