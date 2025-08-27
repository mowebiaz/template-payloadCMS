import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  // Base sans trailing slash
  const url = getServerSideURL()
  const lastmod = new Date().toISOString()

  const pages = [
    '',               
    '/about',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    pages
      .map((p) => {
        const loc = p ? `${url}${p}` : url
        return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      })
      .join('') +
    `</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}


