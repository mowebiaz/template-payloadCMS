import { LuLoader } from 'react-icons/lu'

export function SubmitButton({
  loading,
  text,
}: {
  loading: boolean
  text: string
}): React.ReactElement {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${loading ? 'is-loading' : ''} submit-button`}
    >
      {text} <LuLoader className={loading ? 'animate-spin' : ''} />
      {/* {loading && <LuLoader className="animate-spin" />} */}
    </button>
  )
}
