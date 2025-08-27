'use client'

import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

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
        id="search"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
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
