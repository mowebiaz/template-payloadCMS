'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

//import { Media } from '@/components/Media'
import useClickableCard from './useClickableCard'
import './ArticleCard.scss'
import Image from 'next/image'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'coverImage'>

export const ArticleCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, coverImage } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className="article-card"
      ref={card.ref}
    >
      <div className='article-card__media'>
        {!coverImage && <div className="no-image">No image</div>}
        {coverImage && typeof coverImage === 'object' && coverImage.url && <Image src={coverImage.url} alt={coverImage.alt || ''} fill/>}
      </div>
      <div className="article-card__content">
        {showCategories && hasCategories && (
          <div className="article-card__categories">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="article-card__title">
            <h3>
              <Link className="article-card__link" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="article-card__desc">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
