import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  placeholder?: string
  type: HTMLInputElement['type']
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props)

  return (
    <div className='my-8 align-middle'>
      {error && (
        <div className='p-4 m-6 flex self-center rounded-md bg-red-200 shadow-xl'>
          {error}
        </div>
      )}
      <div className='px-2'>
        <p className='font-semibold mx-5'>{label}</p>
        <label htmlFor={field.name}></label>
        <input
          className='border-2 border-transparent mx-5 p-3 rounded-md focus:border-pink-600 shadow-inner outline-none'
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
