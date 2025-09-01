import { getServerSideURL } from "@/utilities/getURL"
import Link from "next/link"

export const LinkToHome = () => {
  return <Link href={getServerSideURL()}>Homepage</Link>
}