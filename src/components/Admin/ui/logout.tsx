// the route transition bar at the top of the page of admin panel
import { Link } from '@payloadcms/ui'

export const Logout = () => {
  return (
    <Link
      href={'/admin/logout'}
      aria-label="Logout"
      tabIndex={0}
      className="nav__log-out"
    >
      logout
    </Link>
  )
}
