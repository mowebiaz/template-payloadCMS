'use client'

import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1') // reset to first page on new search
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <label
        htmlFor="search"
        className="sr-only"
      >
        Search
      </label>
      <input
        type="search"
        id="search"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        placeholder="Search..."
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button
        type="submit"
        className="sr-only"
      >
        submit
      </button>
    </form>
  )
}
