import React from 'react'
import type { Post } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import './PostHero.scss'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, publishedAt, title } = post

  return (
    //relative -mt-[10.4rem] flex items-end
    <div className="posthero">
        <div className="posthero__categories">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category

              const titleToUse = categoryTitle || 'Untitled category'

              const isLast = index === categories.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div>
        <h1 className="posthero__title">{title}</h1>

        {publishedAt && (
          <div className="posthero__date">
            <p>Publié le:</p>
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          </div>
        )}

    </div>
  )
}
