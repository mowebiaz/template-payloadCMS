import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getUser } from './actions/getUser'
import { LogoutButton } from './components/LogoutButton'

const Template: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <div>
        <LogoutButton />
      </div>
      {children}
    </>
  )
}

export default Template
