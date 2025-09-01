import { Payload } from 'payload'

export const PostsByStatus = async ({ payload }: { payload: Payload }) => {
  const drafts = await payload
    .count({
      collection: 'posts',
      where: {
        _status: {
          equals: 'draft',
        },
      },
    })
    .then((res) => res.totalDocs)

      const published = await payload
    .count({
      collection: 'posts',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })
    .then((res) => res.totalDocs)

    return <p>there {drafts !== 1 ? 'are' : 'is'} {drafts} post{drafts !== 1 ? 's' : ''} in drafts and {published} post{published !== 1 ? 's' : ''} published

    </p>
}

// drafts:
// http://localhost:3000/admin/collections/posts?limit=25&sort=-updatedAt&columns=%5B%22title%22%2C%22createdAt%22%2C%22updatedAt%22%2C%22id%22%2C%22-slug%22%2C%22_status%22%2C%22coverImage%22%2C%22-content%22%2C%22-BlockTest%22%2C%22-excerpt%22%2C%22-plaintext%22%2C%22-meta.title%22%2C%22-meta.description%22%2C%22-meta.image%22%2C%22-meta.canonicalUrl%22%2C%22-meta.preview%22%2C%22-meta.overview%22%5D&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5B_status%5D%5Bequals%5D=draft&page=1

//published: 
// http://localhost:3000/admin/collections/posts?limit=25&sort=-updatedAt&columns=%5B%22title%22%2C%22createdAt%22%2C%22updatedAt%22%2C%22id%22%2C%22-slug%22%2C%22_status%22%2C%22coverImage%22%2C%22-content%22%2C%22-BlockTest%22%2C%22-excerpt%22%2C%22-plaintext%22%2C%22-meta.title%22%2C%22-meta.description%22%2C%22-meta.image%22%2C%22-meta.canonicalUrl%22%2C%22-meta.preview%22%2C%22-meta.overview%22%5D&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5B_status%5D%5Bequals%5D=published&page=1

