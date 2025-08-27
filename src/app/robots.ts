import { getServerSideURL } from "@/utilities/getURL";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = getServerSideURL()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: [`${url}/pages-sitemap.xml`, `${url}/posts-sitemap.xml`],
    host: url,
  }
}