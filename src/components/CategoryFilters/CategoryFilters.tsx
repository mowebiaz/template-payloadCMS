'use client'

import Link from 'next/link'
import type { Category } from '@/payload-types'

type CategoryFiltersProps = {
  categories: Category[]
  currentCategorySlug: string
}

export function CategoryFilters({
  categories,
  currentCategorySlug,
}: CategoryFiltersProps) {
  return (
    <div className="category-filters">
      <Link
        href="/posts/page/1"
        className={`category-filters__button ${currentCategorySlug === 'all' ? 'category-filters__button--active' : ''}`}
        aria-current={currentCategorySlug === 'all' ? 'page' : undefined}
      >
        Toutes les catégories
      </Link>

      {categories.map((cat) => {
        const active = currentCategorySlug === cat.slug
        const href = `/posts/page/1?category=${cat.slug}`

        return (
          <Link
            key={cat.id}
            href={href}
            className={`category-filters__button ${active ? 'category-filters__button--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {cat.title}
          </Link>
        )
      })}
    </div>
  )
}
