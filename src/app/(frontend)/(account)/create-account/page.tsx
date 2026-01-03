import { redirect } from 'next/navigation'
import { getUser } from '../../(auth)/actions/getUser'
import { CreateForm } from './components/CreateForm'

export default async function CreateAccountPage(): Promise<React.ReactElement> {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }

  return (
    <main>
      <CreateForm />
    </main>
  )
}
