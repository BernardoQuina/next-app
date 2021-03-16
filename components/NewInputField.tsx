import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

type NewInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  showLabel?: boolean
  name: string
  placeholder?: string
  inputStyling?: string
  type: HTMLInputElement['type']
  textarea?: boolean
  maxLength?: number
}

export const NewInputField: React.FC<NewInputFieldProps> = ({
  label,
  showLabel = true,
  textarea,
  inputStyling,
  maxLength,
  ...props
}) => {
  const [field, { error }] = useField(props)

  let flex = ''

  if (props.type === 'checkbox') {
    flex = ' flex'
  }

  return (
    <div className='my-6 mx-auto'>
      {error && (
        <div className='p-4 m-6 flex self-center rounded-md bg-red-200 shadow-xl'>
          {error}
        </div>
      )}
      <div className={'px-2 mx-auto items-center' + flex}>
        {label && showLabel && <p className='font-semibold mx-2'>{label}</p>}
        <label htmlFor={field.name}></label>
        {textarea ? (
          <textarea
            className={
              inputStyling
                ? inputStyling
                : 'border-2 border-transparent mx-5 p-3 rounded-md focus:border-pink-600 shadow-inner outline-none'
            }
            {...field}
            maxLength={maxLength}
            id={field.name}
            placeholder={props.placeholder}
          ></textarea>
        ) : (
          <input
            className={
              inputStyling
                ? inputStyling
                : 'border-2 border-transparent mx-5 p-3 rounded-md focus:border-pink-600 shadow-inner outline-none'
            }
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
        )}
      </div>
    </div>
  )
}
