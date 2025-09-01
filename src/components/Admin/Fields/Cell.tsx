import { getServerSideURL } from '@/utilities/getURL'
import Link from 'next/link'
import { DefaultCellComponentProps } from 'payload'

export const TitleCell = (props: DefaultCellComponentProps) => {
  const { cellData, rowData, collectionSlug } = props
  const { _status, id } = rowData
  const url = getServerSideURL() + '/admin'

  const unpublished = 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-notebook-icon lucide-notebook"
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2"
      />
      <path d="M16 2v20" />
    </svg>
  

  const published = 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-notebook-text-icon lucide-notebook-text"
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2"
      />
      <path d="M9.5 8h5" />
      <path d="M9.5 12H16" />
      <path d="M9.5 16H14" />
    </svg>

    const icon = _status === 'published' ? published : unpublished

    return <div>
      {icon} <Link href={url + `/collections/${collectionSlug}/${id}`}>{cellData}</Link>
    </div>
  
}
