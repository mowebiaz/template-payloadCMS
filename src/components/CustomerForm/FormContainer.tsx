import './FormContainer.scss'

export const FormContainer = ({
  children,
  heading,
}: {
  children: React.ReactNode
  heading: string
}) => {
  return (
    <div className='form-container'>
      <div>
        <h1>{heading}</h1>
      </div>
      <div className='form-container__children'>{children}</div>
    </div>
  )
}
