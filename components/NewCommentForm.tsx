import { Formik, Form } from 'formik'
import { Dispatch, SetStateAction } from 'react'

import {
  useNewCommentMutation,
  SingleCommentQuery,
  SingleCommentDocument,
} from '../generated/graphql'
import { InputField } from './InputField'

interface NewCommentFormProps {
  postId: string
  commenting: boolean
  setCommenting: Dispatch<SetStateAction<boolean>>
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  commenting,
  setCommenting,
}) => {
  const [newComment] = useNewCommentMutation()

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      onSubmit={async ({ text }, { setErrors }) => {
        setCommenting(true)
        const response = await newComment({
          variables: { postId, text },
          update: (cache, { data }) => {
            cache.writeQuery<SingleCommentQuery>({
              query: SingleCommentDocument,
              variables: { commentId: data?.createComment?.id },
              data: {
                __typename: 'Query',
                comment: data?.createComment,
              },
            })
          },
        })

        if (response.errors) {
          console.log(response.errors)
          setErrors({ text: response.errors[0].message })
        }
        setCommenting(false)
      }}
    >
      {() => (
        <Form className='flex max-w-lg border hover:border-pink-600 shadow-md rounded-lg my-5'>
          <InputField name='text' placeholder='comment...' type='text' />

          {commenting ? (
            <button className='self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'>
              loading
            </button>
          ) : (
            <button
              className='self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
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

export default NewCommentForm
