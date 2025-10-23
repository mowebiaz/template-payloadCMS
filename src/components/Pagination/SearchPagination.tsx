'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { FaEllipsis } from 'react-icons/fa6'
import './PaginationUi'
import './SearchPaginationUi.scss'

export function SearchPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1
  const hasExtraPrevPages = currentPage - 1 > 1
  const hasExtraNextPages = currentPage + 1 < totalPages

  return (
    <>
      <nav
        aria-label="pagination"
        className="pagination"
        role="navigation"
      >
        <ul className="pagination__content">
          {/* previous */}
          <li className="pagination__item">
            <Link
              href={createPageURL(currentPage - 1)}
              className={!hasPrevPage ? 'isDisabled' : ''}
              aria-label="aller à la page précédente"
            >
              <GrFormPrevious />
              <span>Previous</span>
            </Link>
          </li>

          {/* extra previous */}
          {hasExtraPrevPages && (
            <li className="pagination__item">
              <span className="pagination__ellipsis">
                <FaEllipsis />
              </span>
            </li>
          )}

          {/* previous page */}
          {hasPrevPage && (
            <li className="pagination__item">
              <Link
                href={createPageURL(currentPage - 1)}
                aria-label={`aller à la page ${currentPage - 1}`}
              >
                {currentPage - 1}
              </Link>
            </li>
          )}

          {/* current */}
          <li className="pagination__item">
            <Link
              href={createPageURL(currentPage)}
              className="isCurrent"
              aria-current="page"
            >
              {currentPage}
            </Link>
          </li>

          {/* next */}
          {hasNextPage && (
            <li className="pagination__item">
              <Link
                href={createPageURL(currentPage + 1)}
                aria-label={`aller à la page ${currentPage + 1}`}
              >
                <span>{currentPage + 1}</span>
              </Link>
            </li>
          )}

          {/* extra next */}
          {hasExtraNextPages && (
            <li className="pagination__item">
              <span className="pagination__ellipsis">
                <FaEllipsis />
              </span>
            </li>
          )}

          <li className="pagination__item">
            <Link
              href={createPageURL(currentPage + 1)}
              className={!hasNextPage ? 'isDisabled' : ''}
              aria-label="aller à la page suivante"
            >
              <span>Next</span>
              <GrFormNext />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
