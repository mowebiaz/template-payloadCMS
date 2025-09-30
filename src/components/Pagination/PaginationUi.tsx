'use client'

import type { ButtonProps } from '../Button/Button'
import { Button } from '../Button/Button'
import './PaginationUi.scss'

//import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaEllipsis } from "react-icons/fa6";

const PaginationComponent = ({ ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className="pagination"
    role="navigation"
    {...props}
  />
)

const PaginationContent: React.FC<
  { ref?: React.Ref<HTMLUListElement> } & React.HTMLAttributes<HTMLUListElement>
> = ({ ref, ...props }) => (
  <ul
    className="pagination__content"
    ref={ref}
    {...props}
  />
)

const PaginationItem: React.FC<
  { ref?: React.Ref<HTMLLIElement> } & React.HTMLAttributes<HTMLLIElement>
> = ({ ref, ...props }) => (
  <li
    className="pagination__item"
    ref={ref}
    {...props}
  />
)

type PaginationLinkProps = {
  isActive?: boolean
} & ButtonProps &
  React.ComponentProps<'button'>

const PaginationLink = ({
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? 'page' : undefined}
    variant={isActive ? 'outline' : 'ghost'}
    className={['pagination__link', (props as any).className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
)

const PaginationPrevious = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={[
      'pagination__link--prev',
      (props as any).className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {/* <ChevronLeft className="h-4 w-4" /> */}
    <GrFormPrevious />
    <span>Previous</span>
  </PaginationLink>
)

const PaginationNext = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={[
      'pagination__link--next',
      (props as any).className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <span>Next</span>
    {/* <ChevronRight className="h-4 w-4" /> */}
    <GrFormNext />
  </PaginationLink>
)

const PaginationEllipsis = ({
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    //className="pagination__ellipsis"
    className={['pagination__ellipsis', (props as any).className].filter(Boolean).join(' ')}
    {...props}
  >
    {/* <MoreHorizontal className="h-4 w-4" /> */}
    <FaEllipsis />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
