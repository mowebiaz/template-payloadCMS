import { Slot } from '@radix-ui/react-slot'
import './Button.scss'

type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'link'
  | 'outline'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  ref?: React.Ref<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={[
        'btn',
        variant && `btn--${variant}`,
        props.disabled && 'is-disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

