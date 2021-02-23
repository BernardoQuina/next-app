import { Formik, Form } from 'formik'

import { useNewCommentMutation, useSinglePostQuery } from '../generated/graphql'
import { InputField } from './InputField'

interface NewCommentFormProps {
  postId: string
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const [newComment] = useNewCommentMutation()

  const { fetchMore } = useSinglePostQuery({
    variables: { postId },
  })

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      onSubmit={async ({ text }, { setErrors }) => {
        const response = await newComment({
          variables: { postId, text },
        })

        if (response.errors) {
          console.log(response.errors)
          setErrors({ text: response.errors[0].message })
        }
        fetchMore({ variables: { postId } })
      }}
    >
      {({ isSubmitting }) => (
        <Form className='md:flex max-w-lg border hover:border-pink-600 shadow-md rounded-lg my-5'>
          <InputField name='text' placeholder='comment...' type='text' />

          {isSubmitting ? (
            <button className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'>
              loading
            </button>
          ) : (
            <button
              className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              comment
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}
