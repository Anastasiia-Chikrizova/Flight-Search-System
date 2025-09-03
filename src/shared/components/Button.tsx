interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  text: string
  variant: 'submit' | 'transparent'
  color: 'blue' | 'red'
  weight?: 'bold' | 'normal' | 'semibold'
}

export const Button = ({
  onClick,
  disabled,
  text,
  variant,
  color,
  weight,
}: ButtonProps) => {
  const baseStyles = 'px-6 py-2 text-sm'
  const variantStyles =
    variant === 'submit'
      ? 'bg-blue-700 hover:bg-blue-800 text-white'
      : // : 'bg-red-700 hover:bg-blue-800 text-white'
        'bg-transparent hover:underline'
  const colorStyles = color === 'blue' ? 'text-blue-700' : 'text-red-600'
  const fontWeight = weight ? ' font-${weight}`' : 'font-semibold'
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${colorStyles} ${fontWeight}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
