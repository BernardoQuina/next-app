import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  placeholder: string
  type: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  ...props
}) => {

  const [field, { error }] = useField(props)

  return (
    <div>
      <label htmlFor={field.name}></label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <div>{error}</div>}
    </div>
  )
}

export default InputField
