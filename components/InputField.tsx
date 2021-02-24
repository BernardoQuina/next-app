import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
  placeholder?: string
  styling?: string
  type: HTMLInputElement['type']
}

export const InputField: React.FC<InputFieldProps> = ({ label, styling, ...props }) => {
  const [field, { error }] = useField(props)

  let flex = ''

  if (props.type === 'checkbox') {
    flex = ' flex'
  }

  return (
    <div className='my-8 max-w-lg mx-auto'>
      {error && (
        <div className='p-4 m-6 flex self-center rounded-md bg-red-200 shadow-xl'>
          {error}
        </div>
      )}
      <div className={'px-2 mx-auto max-w-xs items-center' + flex}>
        {label && <p className='font-semibold mx-5'>{label}</p>}
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
