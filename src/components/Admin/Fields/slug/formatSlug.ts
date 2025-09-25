import { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // tout ce qui n'est pas alnum -> '-'
    .replace(/^-+|-+$/g, '');     // trim des tirets

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }
    return value
  }
