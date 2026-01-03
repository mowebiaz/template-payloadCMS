type Props = {
  label: string
  name: string
  type: 'text' | 'email' | 'password'
  placeholder?: string
  required?: boolean
  defaultValue?: string
}

export const Input = (props: Props) => {
  return (
    <div className="form__field">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={
          props.placeholder
            ? props.placeholder
            : `Enter your ${props.label.toLowerCase()}`
        }
        required={props.required}
        defaultValue={props.defaultValue ? props.defaultValue: ''}
        className="form__input"
      />
    </div>
  )
}
