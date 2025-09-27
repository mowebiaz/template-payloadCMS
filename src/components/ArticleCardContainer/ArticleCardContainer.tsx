import { ArticleCard, CardPostData } from '../ArticleCard/ArticleCard'
import './ArticleCardContainer.scss'

export type Props = {
  posts: CardPostData[]
}

export const ArticleCardContainer: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className='container'>
        <div className="posts">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="posts__item" key={index}>
                  <ArticleCard doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
    </div>
  )
}
