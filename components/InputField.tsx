import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  placeholder: string
  type: string
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props)

  return (
    <div className='m-8 align-middle'>
      {error && (
        <div className='p-4 mb-4 flex self-center rounded-md bg-red-200'>
          {error}
        </div>
      )}
      <div className='px-10'>
        <p className='font-semibold'>{label}</p>
        <label htmlFor={field.name}></label>
        <input
          className='border-2 p-3 rounded-md focus:border-pink-600 outline-none'
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}

export default InputField
