import type { Customer, TierProps } from '@/payload-types'
import { getUser } from '../actions/getUser'
import './Dashboard.scss'
import { Customers } from '@/collections/Customers/config'
import { ResetPasswordButton } from '../components/ResetPasswordButton'
import { UpdateForm } from '../components/UpdateForm'

export default async function Page() {
  const user = (await getUser()) as Customer
  const tiers = Customers.fields
    .filter((field) => field.type === 'radio')
    .filter((field) => field.name === 'tier')[0].options

  return (
    <main id="dashboard">
      <div className="one">
        <h1>Bonjour {user.firstName ? user.firstName : user.email}</h1>
        <p>
          Vous êtes actuellement sur un forfait{' '}
          {user.tier?.toLowerCase() || 'free'}
        </p>
      </div>
      <UpdateForm
        user={user}
        tiers={tiers as TierProps[]}
      />
      <div className="two">
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  )
}
