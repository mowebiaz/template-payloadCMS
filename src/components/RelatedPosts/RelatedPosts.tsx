import { ArticleCard } from '../ArticleCard/ArticleCard'
import type { CardPostData } from '../ArticleCard/ArticleCard'
import './RelatedPosts.scss'

export type RelatedPostsProps = {
  docs?: CardPostData[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { docs } = props

  return (
    <div className="related-posts">
      {docs?.map((doc, index) => {
        if (typeof doc === 'string') return null

        return (
          <ArticleCard
            key={index}
            doc={doc}
            relationTo="posts"
            showCategories
          />
        )
      })}
    </div>
  )
}
